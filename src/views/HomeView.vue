<script lang="ts">
import { defineComponent } from "vue";
import WeatherTile from "@/components/WeatherTile.vue";
import { searchFilter } from "@/main";

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
  computed: {
    filteredCities() {
      if (searchFilter.value.length < 3) return this.cities;
      return this.cities.filter((city: string) => city.toLowerCase().includes(searchFilter.value.toLowerCase()));
    },
  },
});
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <WeatherTile v-for="city in filteredCities" :city="city" :key="city" />
  </div>
</template>
