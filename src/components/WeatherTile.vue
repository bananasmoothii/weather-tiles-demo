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
      interval: 0,
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
  },
  mounted() {
    api.getCurrentWeatherByCityName({ cityName: this.city }).then((weather: CurrentResponse) => {
      this.weather = weather;
      console.log(weather);

      this.computeTime();
      this.interval = setInterval(() => {
        this.computeTime();
      }, 1000);
    });
  },
  unmounted() {
    clearInterval(this.interval);
  },
});
</script>

<template>
  <div class="weather-tile m-6 h-[16rem] w-[16rem] p-6">
    <button
      v-if="weather"
      class="h-full w-full text-center"
      @click="$router.push('/weather/' + encodeURIComponent(weather.name))"
    >
      <img
        :src="`https://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`"
        alt="Weather icon"
        height="64"
        width="64"
        class="mx-auto"
      />
      <h2 class="text-center font-header text-lg uppercase">
        {{ weather.name }}
        ({{ timeStr }})
      </h2>
    </button>
  </div>
</template>

<style lang="scss">
.weather-tile {
  border-radius: 3rem;
  border: theme("colors.primary") 1rem solid;

  &:hover {
    transform: translate(0, -0.8rem) rotate(3deg);
  }
}
</style>
