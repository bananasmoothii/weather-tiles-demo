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
  <div id="main" class="mx-8 mt-20 min-h-[80vh] md:mx-16 md:mt-28 xl:mx-36">
    <RouterView />
  </div>
  <Footer :links="links" />
</template>
