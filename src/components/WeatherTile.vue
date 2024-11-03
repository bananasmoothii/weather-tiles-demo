<script lang="ts">
import { defineComponent } from "vue";
import type { CurrentResponse } from "openweathermap-ts/dist/types";
import { api } from "@/weather";
import IconAndText from "@/components/util/IconAndText.vue";
import { ArchiveBoxXMarkIcon, ArrowLongUpIcon, HandRaisedIcon } from "@heroicons/vue/24/outline";

type Weather = CurrentResponse & {
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
};

export default defineComponent({
  name: "WeatherTile",
  components: {
    IconAndText,
    HandRaisedIcon,
    ArrowLongUpIcon,
    ArchiveBoxXMarkIcon,
  },
  data() {
    return {
      weather: null as Weather | null,
      timeStr: "",
      intervals: [] as number[],
      hovered: false,
      bgLink: "",
      bgLoaded: false,
      doSlowTransition: true,
      error: false,
    };
  },
  props: {
    city: {
      type: String,
      required: true,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    localizedCityName: (localizedCityName: string) => true,
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
      let cityName = this.city.toLowerCase().replace(" ", "-");
      this.bgLink = "/weather-tiles-demo/cities/" + cityName + ".jpg";

      // this api has been shut down

      // let searchResult = await fetch(
      //   "https://api.teleport.org/api/urban_areas/slug:" +
      //     encodeURIComponent(cityName) +
      //     "/images/",
      // )
      //   .then((res) => {
      //     if (!res.ok) return;
      //     return res.json();
      //   })
      //   .catch(() => {});
      // if (!searchResult) return;
      // let photos = searchResult.photos;
      // if (!photos) return;
      // let images = photos[Math.floor(Math.random() * photos.length)].image;
      // this.bgLink = this.big ? images.web : images.mobile;
    },
    async fetchWeather() {
      await api
        .getCurrentWeatherByCityName({ cityName: this.city })
        .then((weather: Weather) => {
          if (weather.cod !== 200) {
            this.error = true;
            return;
          }
          this.weather = weather;
          this.$emit("localizedCityName", weather.name);
          this.computeTime();
        })
        .catch(() => {
          this.error = true;
        });
    },
    onBgLoad() {
      this.bgLoaded = true;
      setTimeout(() => {
        this.doSlowTransition = false;
      }, 1000);
    },
  },
  mounted() {
    this.fetchWeather().then(() => {
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

    let tileWithBg = this.$el as HTMLElement;
    let tile = this.$refs.tile as HTMLElement;
    tileWithBg.addEventListener("mousemove", (e) => {
      // no animation on mobile
      if (Math.min(window.innerWidth, window.innerHeight) < 640) {
        tile.style.setProperty("--hover-percent", "1");
        return;
      }

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
  watch: {
    city() {
      this.weather = null;
      this.error = false;
      this.fetchWeather();
      this.doSlowTransition = true;
      this.bgLoaded = false;
      this.bgLink = "";
      this.findBackgroundImage();
    },
  },
});
</script>

<template>
  <RouterLink
    :to="weather?.main && !error ? '/weather/' + encodeURIComponent(city) : '/'"
    class="weather-link relative"
    :class="big && 'weather-big'"
    @mouseover="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      ref="bg"
      :src="bgLink"
      alt="Background image"
      class="h-full w-full rounded-2xl bg-cover bg-center object-cover"
      :class="
        (bgLink && bgLoaded ? (hovered || big ? 'opacity-100' : 'opacity-80') : 'opacity-0') +
        ' ' +
        (doSlowTransition ? 'no-transition' : '')
      "
      @load="onBgLoad()"
    />
    <div class="weather-tile absolute inset-0 p-6" ref="tile" :class="hovered && 'hovered'">
      <div class="h-full w-full" :class="weather?.main || error ? 'opacity-100' : 'opacity-0'">
        <div v-if="weather?.main" class="flex h-full w-full flex-col items-center justify-center">
          <div class="flex items-center justify-center">
            <img
              v-for="w in weather.weather.slice(0, 3)"
              :src="`https://openweathermap.org/img/wn/${w.icon}@4x.png`"
              alt="Weather icon"
              height="75"
              width="75"
              class="scale-[1.4]"
            />
          </div>
          <span class="block text-center font-header text-lg">{{ weather.name }}, {{ weather.sys.country }}</span>
          <span class="city-time -mt-1 block text-center text-sm">{{ timeStr }}</span>
          <div class="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span v-for="w in weather.weather.slice(0, 4)" class="max-w-full text-center">{{ w.description }}</span>
            <IconAndText :gap="1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>thermometer</title>
                <path d="M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z" />
              </svg>
              <span>{{ Math.round(weather.main.temp) }}°C</span>
            </IconAndText>
            <IconAndText :gap="1">
              <HandRaisedIcon />
              <span>{{ Math.round(weather.main.feels_like) }}°C</span>
            </IconAndText>
            <IconAndText :gap="1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>water-percent</title>
                <path
                  d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z"
                />
              </svg>
              <span>{{ Math.round(weather.main.humidity) }}%</span>
            </IconAndText>
            <IconAndText v-if="weather.rain" :gap="1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>weather-rainy</title>
                <path
                  d="M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59"
                />
              </svg>
              <span v-if="weather.rain['3h']">{{ Math.round(weather.rain["3h"] * 10) / 10 }} mm</span>
              <span v-else>{{ Math.round(weather.rain["1h"]! * 10) / 10 }} mm</span>
            </IconAndText>
            <IconAndText v-if="weather.snow" :gap="1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>weather-snowy</title>
                <path
                  d="M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z"
                />
              </svg>
              <span v-if="weather.snow['3h']">{{ Math.round(weather.snow["3h"]) }} mm</span>
              <span v-else>{{ Math.round(weather.snow["1h"]!) }} mm</span>
            </IconAndText>
            <IconAndText :gap="1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>weather-windy</title>
                <path
                  d="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z"
                />
              </svg>
              <span>{{ Math.round(weather.wind.speed) }} km/h</span>
              <ArrowLongUpIcon :style="{ transform: 'rotate(' + weather.wind.deg + 'deg)' }" />
            </IconAndText>
          </div>
        </div>
        <div v-else-if="error" class="flex h-full w-full flex-col items-center justify-center">
          <!-- No result for this city -->
          <ArchiveBoxXMarkIcon class="mx-auto h-12 w-12" />
          <span class="text-center">Nothing found for {{ city }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss">
.weather-link {
  height: min(25rem, 85vw);
  width: min(25rem, 85vw);

  &.weather-big {
    width: 100%;
  }

  & > img.no-transition {
    // fade in when image loads
    transition: opacity 1s ease-out;
  }
}

.weather-tile {
  // I use a "pseudo-margin" in order to have a square tile even when the background is larger / stretched like on the
  // /weather/city page
  --pseudo-margin: 1.5rem;
  @media (min-width: 29rem) {
    // image size + page padding
    --pseudo-margin: 3.5rem;
  }

  width: calc(min(100%, 25rem) - var(--pseudo-margin) * 2);
  height: calc(min(100%, 25rem) - var(--pseudo-margin) * 2);
  margin: var(--pseudo-margin) auto 0 auto;

  border: theme("colors.primary") 1rem solid;
  backdrop-filter: blur(2px);
  box-shadow: 0.2rem 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.3);

  transition: all 0.3s ease-out;

  // gravity effect
  --tx: 0;
  --ty: 0;
  --hover-percent: 0;
  transform: translate(var(--tx), var(--ty));

  border-radius: calc(3.8rem - var(--hover-percent) * 1.5rem);
  background: rgba(255, 255, 255, calc(0.3 + var(--hover-percent) * 0.1));

  &.hovered {
    box-shadow: 0.6rem 1rem 0.4rem 0.2rem rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
  }
}

.city-time {
  letter-spacing: 3px;
}
</style>
