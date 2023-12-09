<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  name: "App",
  components: { Footer, Header },
  data() {
    return {
      links: [
        { name: "Home", to: "/" },
        { name: "About", to: "/about" },
        { name: "Dummy", to: "/" },
      ],
    };
  },
});
</script>

<template>
  <Header :links="links" />
  <div id="main" class="px-8 pt-24 md:px-16 md:pt-28 xl:px-36">
    <RouterView />
  </div>
  <Footer :links="links" />
</template>
