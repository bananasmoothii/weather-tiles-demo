<script lang="ts">
import {defineComponent} from 'vue'
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "App",
  components: {Header}
})
</script>

<template>
  <Header/>
  <div id="main" class="mt-20 md:my-28 mx-8 md:mx-16 xl:mx-36">
    <RouterView/>
  </div>
</template>
