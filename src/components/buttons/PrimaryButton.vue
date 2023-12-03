<template xmlns="http://www.w3.org/1999/html">
  <button @click="onClick" @mouseenter="mouseEnter" @mouseleave="mouseLeave" type="button" ref="button"
          class="rounded-lg px-3 py-2.5 font-semibold text-gray-900 bg-primary transition-all duration-200 ease-in-out
       hover:bg-primary-lighter hover:text-gray-700">
    <slot/>
  </button>
</template>

<script lang="ts">
export default {
  name: 'PrimaryButton',
  emits: {
    click: (e: PointerEvent) => true
  },
  methods: {
    onClick(e: PointerEvent) {
      this.$emit('click', e)
    },
    mouseEnter(e: PointerEvent) {
      let button: HTMLButtonElement = this.$refs.button;
      button.querySelectorAll(".button-hover").forEach((el: Element) => {
        for (let clazz of el.classList.values()) {
          if (clazz.startsWith("button-hover:")) {
            el.classList.add(clazz.slice(13));
          }
        }
      })
    },
    mouseLeave(e: PointerEvent) {
      let button: HTMLButtonElement = this.$refs.button;
      button.querySelectorAll(".button-hover").forEach((el: Element) => {
        for (let clazz of el.classList.values()) {
          if (clazz.startsWith("button-hover:")) {
            el.classList.remove(clazz.slice(13));
          }
        }
      })
    }
  },
}
</script>
