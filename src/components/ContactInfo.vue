<script lang="ts">
import { defineComponent } from "vue";
import { AtSymbolIcon, MapPinIcon } from "@heroicons/vue/24/outline";
import IconAndText from "@/components/util/IconAndText.vue";

export default defineComponent({
  name: "ContactInfo",
  components: { IconAndText, MapPinIcon, AtSymbolIcon },
});
</script>

<template>
  <div class="px-4 py-2">
    <IconAndText>
      <MapPinIcon />
      <p class="m-0">Number 17<br />Cherry Tree Lane</p>
    </IconAndText>
    <IconAndText>
      <AtSymbolIcon />
      <a href="mailto://mary@poppins.co.uk">mary@poppins.co.uk</a>
    </IconAndText>
  </div>
</template>
