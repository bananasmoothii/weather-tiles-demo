<script lang="ts">
import { defineComponent } from "vue";
import type { CurrentResponse } from "openweathermap-ts/dist/types";
import { api } from "@/weather";

export default defineComponent({
  name: "WeatherTile",
  data() {
    return {
      weather: null as CurrentResponse | null,
      timeStr: "",
      intervals: [] as number[],
      hovered: false,
      bgLink: "",
    };
  },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
  methods: {
    computeTime() {
      if (!this.weather) return;
      this.timeStr = new Date(
        Date.now() +
          new Date().getTimezoneOffset() * 60000 + // to get UTC time
          this.weather.timezone * 1000, // to get local time for new city
      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
    async findBackgroundImage() {
      let searchResult = await fetch(
        "https://api.teleport.org/api/urban_areas/slug:" +
          encodeURIComponent(this.city.toLowerCase().replace(" ", "-")) +
          "/images/",
      ).then((res) => res.json());
      this.bgLink = searchResult.photos[0].image.mobile;
    },
    async fetchWeather() {
      await api.getCurrentWeatherByCityName({ cityName: this.city }).then((weather: CurrentResponse) => {
        this.weather = weather;
        console.log(weather);
      });
    },
  },
  mounted() {
    this.fetchWeather().then(() => {
      this.computeTime();
      this.intervals.push(
        setInterval(() => {
          this.computeTime();
        }, 1000),
      );
    });

    this.findBackgroundImage();

    this.intervals.push(
      setInterval(
        () => {
          this.fetchWeather();
        },
        1000 * 60 * 5,
      ),
    ); // 5 minutes

    // gravity effect
    function sign(a: number): number {
      return a < 0 ? -1 : 1;
    }

    let tileWithBg = this.$el as HTMLElement;
    let tile = this.$refs.tile as HTMLElement;
    tileWithBg.addEventListener("mousemove", (e) => {
      let width = tileWithBg.offsetWidth;
      let height = tileWithBg.offsetHeight;
      let centerX = width / 2;
      let centerY = height / 2;
      let left = tileWithBg.offsetLeft;
      let top = tileWithBg.offsetTop;
      let x = e.pageX - left;
      let y = e.pageY - top;
      let xFromCenter = x - centerX;
      let yFromCenter = y - centerY;
      let radius = Math.max(Math.sqrt(xFromCenter * xFromCenter + yFromCenter * yFromCenter), 0.0001);
      // let angle = Math.atan2(yFromCenter, xFromCenter);
      let cos = xFromCenter / radius;
      let sin = yFromCenter / radius;

      if (Math.abs(cos) < 0.01) cos = 0;
      if (Math.abs(sin) < 0.01) sin = 0;

      let borderPercent = 1 - radius / Math.max(width, height); // 0 when mouse is at the center, 1 when mouse is at the border
      let newRadius = borderPercent * Math.pow(radius, 0.7);

      tile.style.setProperty("--tx", cos * newRadius + "px"); // (t: transform)
      tile.style.setProperty("--ty", sin * newRadius + "px");
      tile.style.setProperty("--hover-percent", borderPercent.toString());
    });
    tileWithBg.addEventListener("mouseleave", () => {
      tile.style.setProperty("--tx", "0");
      tile.style.setProperty("--ty", "0");
      tile.style.setProperty("--hover-percent", "0");
    });
  },
  unmounted() {
    for (let interval of this.intervals) {
      clearInterval(interval);
    }
  },
});
</script>

<template>
  <RouterLink
    :to="'/weather/' + encodeURIComponent(city)"
    class="weather-link relative"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      :src="bgLink"
      alt="Background image"
      class="h-full w-full rounded-2xl bg-cover"
      :class="bgLink ? (hovered ? 'opacity-100' : 'opacity-80') : 'opacity-0'"
    />
    <div class="weather-tile absolute inset-0 p-6" ref="tile" :class="hovered && 'hovered'">
      <div v-if="weather" class="flex h-full w-full flex-col items-center justify-center">
        <img
          :src="`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@4x.png`"
          alt="Weather icon"
          height="100"
          width="100"
          class="mx-auto -mt-4"
        />
        <span class="-mt-4 block text-center font-header text-lg">{{ weather.name }}</span>
        <span class="city-time -mt-1 block text-center text-sm">{{ timeStr }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss">
.weather-link {
  height: min(22rem, 75vw);
  width: min(22rem, 75vw);
}

.weather-tile {
  margin: max(1.5rem, 5vw);
  @apply sm:m-14;

  border: theme("colors.primary") 1rem solid;
  //border: 1px rgba(255, 255, 255, 0.2) solid;
  box-shadow: 0.2rem 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.3);

  transition: all 0.3s ease-out;

  // gravity effect
  --tx: 0;
  --ty: 0;
  --hover-percent: 0;
  transform: translate(var(--tx), var(--ty));

  border-radius: calc(3rem - var(--hover-percent) * 1.3rem);
  backdrop-filter: blur(calc(2px + var(--hover-percent) * 3px));
  background: rgba(255, 255, 255, calc(0.3 + var(--hover-percent) * 0.1));

  &.hovered {
    //transform: translate(0, -0.8rem);
    //border-radius: 1.8rem;
    box-shadow: 0.6rem 1rem 0.4rem 0.2rem rgba(0, 0, 0, 0.3);
    //backdrop-filter: blur(4px);
    //background: rgba(255, 255, 255, 0.4);
  }
}

.city-time {
  letter-spacing: 3px;
}
</style>
