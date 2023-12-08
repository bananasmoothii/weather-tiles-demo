<script lang="ts">
import { defineComponent } from "vue";
import Brand from "@/components/util/Brand.vue";
import ContactInfo from "@/components/ContactInfo.vue";

export default defineComponent({
  name: "Footer",
  components: { ContactInfo, Brand },
  props: {
    links: {
      type: Array as () => { name: string; to: string }[],
    },
  },
});
</script>

<template>
  <!--
  The footer should have the following information:
• 3 columns
• Column 1: logo
• Column 2: same navigation items as in the main navigation
• Column 3: dummy contact information (name, address, phone email)
  -->
  <footer class="bg-gray-800 p-8 text-white">
    <div class="flex flex-col gap-8 md:flex-row md:justify-evenly">
      <Brand grow-in-md class="mx-auto md:mx-0" />
      <ul class="px-4">
        <li v-for="link in links">
          <RouterLink :to="link.to" class="mt-1.5 block text-center text-lg md:text-left">
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>
      <ContactInfo class="justify-center md:justify-start" />
    </div>
  </footer>
</template>

<style lang="scss">
footer a:not(.brand-link) {
  background-image: linear-gradient(to right, theme("colors.primary"), theme("colors.primary") 50%, white 50%);
  background-size: 200% 100%;
  background-position: -100%;
  position: relative;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

footer a:not(.brand-link):hover {
  background-position: 0;
}
</style>
