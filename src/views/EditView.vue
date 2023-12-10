<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { cities, type City, nameToCity, resetCities } from "@/cities";
import { PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { VueDraggable } from "vue-draggable-plus";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";

export default defineComponent({
  name: "EditView",
  data() {
    return {
      drag: false,
      newCityName: "",
    };
  },
  components: {
    PrimaryButton,
    PencilIcon,
    XMarkIcon,
    PlusIcon,
    VueDraggable,
  },
  computed: {
    cities: {
      get() {
        return cities;
      },
      set(value: City[]) {
        cities.splice(0, cities.length, ...value);
      },
    },
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    resetCities,
    nextTick,
    nameToCity,
    editCity(city: City) {
      document.getElementById(`city-name-${city.randomId}`)?.focus();
    },
    removeCity(city: City) {
      cities.splice(cities.indexOf(city), 1);
    },
  },
});
</script>

<template>
  <div>
    <h2 class="text-center">Edit the city list</h2>
    <p class="mb-8 text-center">Drag and drop to change order</p>
    <ul class="mx-auto mb-8 max-w-xl">
      <li class="city-li">
        <PlusIcon />
        <input
          type="text"
          placeholder="Add city"
          v-model="newCityName"
          @keyup.enter="
            cities.splice(0, 0, nameToCity(newCityName));
            newCityName = '';
          "
        />
      </li>
    </ul>
    <VueDraggable
      class="mx-auto mb-8 max-w-xl"
      v-model="cities"
      :animation="300"
      @start="drag = true"
      @end="nextTick(() => (drag = false))"
      target=".sort-target"
      handle=".handle"
    >
      <TransitionGroup tag="ul" type="transition" class="sort-target" :name="drag ? undefined : 'fade'">
        <li v-for="(element, index) in cities" class="no-transition city-li" :key="element.randomId">
          <span class="handle cursor-move">{{ index + 1 }}.</span>
          <input type="text" :id="`city-name-${element.randomId}`" v-model="element.name" />
          <button @click="editCity(element)">
            <PencilIcon />
          </button>
          <button @click="removeCity(element)">
            <XMarkIcon />
          </button>
          <svg class="handle cursor-move" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>drag</title>
            <path
              d="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z"
            />
          </svg>
        </li>
      </TransitionGroup>
    </VueDraggable>
    <PrimaryButton class="no-transition mx-auto" @click="resetCities">Reset</PrimaryButton>
  </div>
</template>

<style lang="scss">
.city-li {
  @apply mt-2 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-5 py-2;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  & > input {
    @apply flex-1 px-2 py-1;
    min-width: 4rem;
  }
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
