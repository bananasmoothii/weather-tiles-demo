<script lang="ts">
import { defineComponent } from "vue";
import Brand from "@/components/util/Brand.vue";
import ContactInfo from "@/components/ContactInfo.vue";

export default defineComponent({
  name: "HomeView",
  components: { ContactInfo, Brand },
});
</script>

<template>
  <div class="mx-auto w-min divide-y rounded-3xl px-12 py-8 shadow-2xl">
    <Brand grow-in-md darken class="justify-center" />
    <div class="py-4 text-center md:min-w-[20rem]">
      <p>
        This is a demo website for a fictional company. It is built with <a href="https://vuejs.org/">Vue 3</a> and
        <a href="https://tailwindcss.com/">Tailwind CSS</a>.<br />
      </p>
      <p>Source code is available on <a href="https://github.com/bananasmoothii/weather-tiles-demo">GitHub</a>.</p>
      <p class="mb-[.7rem]">Made by <a href="https://github.com/bananasmoothii">Bananasmoothii</a>.</p>
    </div>
    <ContactInfo class="justify-center" />
  </div>
</template>
