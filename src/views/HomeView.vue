<script lang="ts">
import { defineComponent } from "vue";
import WeatherTile from "@/components/WeatherTile.vue";

export default defineComponent({
  name: "HomeView",
  components: { WeatherTile },
  data() {
    return {
      cities: ["Paris", "London", "New York", "Tokyo", "Moscow", "Beijing", "Sydney", "Cairo", "Berlin", "Madrid"],
    };
  },
});
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <WeatherTile v-for="city in cities" :city="city" :key="city" />
  </div>
</template>
