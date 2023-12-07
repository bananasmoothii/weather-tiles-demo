<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "App",
  components: { Header },
});
</script>

<template>
  <Header />
  <div id="main" class="mx-8 mt-20 md:mx-16 md:my-28 xl:mx-36">
    <RouterView />
  </div>
</template>
