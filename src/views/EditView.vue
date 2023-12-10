<script lang="ts">
import { defineComponent } from "vue";
import { cities, type City, nameToCity } from "@/cities";
import { PencilIcon, PlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import draggable from "vuedraggable";

export default defineComponent({
  name: "EditView",
  data() {
    return {
      drag: false,
      newCityName: "",
    };
  },
  components: {
    PencilIcon,
    XMarkIcon,
    PlusIcon,
    draggable,
  },
  computed: {
    cities() {
      return cities;
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
    nameToCity,
    editCity(city: City) {
      this.editedCityId = city.randomId;
      document.getElementById(`city-name-${city.randomId}`).focus();
    },
    removeCity(city: City) {
      cities.value = cities.value.filter((c) => c.randomId !== city.randomId);
    },
  },
});
</script>

<template>
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
          cities.value.splice(0, 0, nameToCity(newCityName));
          newCityName = '';
        "
      />
    </li>
  </ul>
  <draggable
    tag="ul"
    class="list-group mx-auto max-w-xl"
    v-model="cities.value"
    item-key="randomId"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element, index }">
      <div class="city-li">
        <span>{{ index + 1 }}.</span>
        <input type="text" :id="`city-name-${element.randomId}`" v-model="element.name" />
        <button @click="editCity(element)">
          <PencilIcon />
        </button>
        <button @click="removeCity(element)">
          <XMarkIcon />
        </button>
      </div>
    </template>
  </draggable>
</template>

<style lang="scss">
.city-li {
  @apply mt-2 flex items-center justify-between gap-3 rounded-lg border px-5 py-2;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  & > input {
    @apply flex-1 px-2 py-1;
  }
}

.ghost {
  opacity: 0.5;
  scale: 0.9;
}
</style>
