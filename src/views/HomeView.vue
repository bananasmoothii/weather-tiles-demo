<script lang="ts">
import { defineComponent } from "vue";
import WeatherTile from "@/components/WeatherTile.vue";
import { searchFilter } from "@/main";
import { add } from "husky";
import { cities, type City } from "@/cities";

export default defineComponent({
  name: "HomeView",
  methods: { add },
  components: { WeatherTile },
  data() {
    return {
      additionalSearchCityLocalizedName: undefined as string | undefined,
    };
  },
  computed: {
    searchFilter() {
      return searchFilter;
    },
    filteredCities() {
      if (searchFilter.value.length < 3) return cities;
      let searchString = searchFilter.value.toLowerCase().trim();
      return cities.filter(
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
      :key="city.randomId"
      @localizedCityName="(n) => (city.localized = n)"
    />
    <WeatherTile
      v-if="
        searchFilter.value.length >= 3 &&
        !filteredCities.some((c: City) => c.localized === additionalSearchCityLocalizedName)
      "
      :city="searchFilter.value"
      @localizedCityName="(n) => (additionalSearchCityLocalizedName = n)"
    />
  </div>
</template>
