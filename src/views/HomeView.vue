<script lang="ts">
import { defineComponent } from "vue";
import WeatherTile from "@/components/WeatherTile.vue";

export default defineComponent({
  name: "HomeView",
  components: { WeatherTile },
  data() {
    return {
      cities: [
        "Paris",
        "Grenoble",
        "Vienna",
        "Hamburg",
        "Berlin",
        "London",
        "New York",
        "Tokyo",
        "Moscow",
        "Copenhagen",
        "Stockholm",
        "Amsterdam",
        "Montreal",
        "Beijing",
        "Sydney",
        "Cairo",
        "Madrid",
        "Lisbon",
        "Athens",
        "Dubai",
      ],
    };
  },
});
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <WeatherTile v-for="city in cities" :city="city" :key="city" />
  </div>
</template>
