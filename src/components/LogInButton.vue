<template>
  <PrimaryButton class="flex gap-3">
    <span class="flex-1 whitespace-nowrap">Log in</span>
    <ArrowLongRightIcon
      class="button-hover button-hover:translate-x-2.5 w-6 transition-all"
      aria-hidden="true"
    />
  </PrimaryButton>
</template>
<script lang="ts">
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import { ArrowLongRightIcon } from "@heroicons/vue/20/solid";

export default {
  name: "LogInButton",
  components: { PrimaryButton, ArrowLongRightIcon },
};
</script>
