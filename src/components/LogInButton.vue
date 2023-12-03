<template>
  <PrimaryButton class="flex gap-3">
    <span class="flex-1 whitespace-nowrap">Log in</span>
    <ArrowLongRightIcon class="w-6 button-hover transition-all button-hover:translate-x-2.5"
                        aria-hidden="true"/>
  </PrimaryButton>
</template>
<script lang="ts">
import PrimaryButton from "@/components/buttons/PrimaryButton.vue"
import {ArrowLongRightIcon} from "@heroicons/vue/20/solid"

export default {
  name: 'LogInButton',
  components: {PrimaryButton, ArrowLongRightIcon},
}
</script>