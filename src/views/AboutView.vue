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
    <ContactInfo class="justify-center" />
  </div>
</template>
