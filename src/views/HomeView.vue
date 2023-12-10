<script lang="ts">
import { defineComponent } from "vue";
import WeatherTile from "@/components/WeatherTile.vue";
import { searchFilter } from "@/main";
import { add } from "husky";

type City = { name: string; localized?: string };

export default defineComponent({
  name: "HomeView",
  methods: { add },
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
      ].map((name: string) => ({ name: name })) as City[],
      additionalSearchCityLocalizedName: undefined as string | undefined,
    };
  },
  computed: {
    searchFilter() {
      return searchFilter;
    },
    filteredCities() {
      if (searchFilter.value.length < 3) return this.cities;
      let searchString = searchFilter.value.toLowerCase().trim();
      return this.cities.filter(
        (city: City) =>
          city.name.toLowerCase().includes(searchString) || city.localized?.toLowerCase().includes(searchString),
      );
    },
  },
});
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <WeatherTile
      v-for="city in filteredCities"
      :city="city.name"
      :key="city.name"
      @localizedCityName="(n) => (city.localized = n)"
    />
    <WeatherTile
      v-if="
        searchFilter.value.length >= 3 && !filteredCities.some((c) => c.localized === additionalSearchCityLocalizedName)
      "
      :city="searchFilter.value"
      @localizedCityName="(n) => (additionalSearchCityLocalizedName = n)"
    />
  </div>
</template>
