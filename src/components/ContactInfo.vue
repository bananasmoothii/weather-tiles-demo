<script lang="ts">
import { defineComponent } from "vue";
import { AtSymbolIcon, MapPinIcon } from "@heroicons/vue/24/outline";

export default defineComponent({
  name: "ContactInfo",
  components: { MapPinIcon, AtSymbolIcon },
  props: {
    center: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div class="p-4">
    <div class="flex items-baseline gap-3">
      <MapPinIcon class="h-[1em]" />
      <p class="m-0">Number 17<br />Cherry Tree Lane</p>
    </div>
    <div class="mt-1.5 flex items-baseline gap-3">
      <AtSymbolIcon class="h-[1em]" />
      <a href="mailto://mary@poppins.co.uk">mary@poppins.co.uk</a>
    </div>
  </div>
</template>

<style scoped>
.flex {
  justify-content: inherit;
}
</style>
