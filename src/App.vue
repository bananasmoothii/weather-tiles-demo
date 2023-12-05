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
  <div id="main" class="my-6 md:my-10 mx-8 md:mx-16 xl:mx-36">
    <RouterView/>
  </div>
</template>
