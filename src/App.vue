<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "App"
})
</script>

<template>
  <header></header>
  <h1 class="text-green-500">Hi</h1>

  <RouterView/>
</template>
