<script lang="ts">
import { defineComponent } from "vue";
import WeatherTile from "@/components/WeatherTile.vue";

export default defineComponent({
  name: "WeatherView",
  components: { WeatherTile },
});
</script>

<template>
  <div class="flex justify-center">
    <WeatherTile :city="$route.params.city as string" big />
  </div>
</template>
