<script lang="ts">
import { defineComponent } from "vue";
import WeatherTile from "@/components/WeatherTile.vue";

export default defineComponent({
  name: "WeatherView",
  components: { WeatherTile },
  props: {
    city: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="flex justify-center">
    <WeatherTile :city="city" big />
  </div>
</template>
