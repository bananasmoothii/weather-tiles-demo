<script lang="ts">
import {defineComponent} from 'vue'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  ArrowLongRightIcon,
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import {ChevronDownIcon, PhoneIcon, PlayCircleIcon} from '@heroicons/vue/20/solid'
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import LogInButton from "@/components/LogInButton.vue";

export default defineComponent({
  name: "Header",
  data() {
    return {
      mobileMenuOpen: false,
      links: [
        {name: "Home", to: "/"},
        {name: "About", to: "/about"},
        {name: "Dummy", to: "/"},
      ]
    }
  },
  components: {
    LogInButton,
    PrimaryButton,
    TransitionChild,
    TransitionRoot,
    ArrowPathIcon,
    ArrowLongRightIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  },
})
</script>

<template>
  <header class="bg-white shadow-lg backdrop-blur transition-all sticky top-0 z-20">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Navbar">
      <div class="flex md:flex-1">
        <RouterLink to="/" class="-m-1.5 p-1.5 flex items-center gap-3 text-primary-darker">
          <img class="h-8 w-8" src="/icon.svg" alt=""/>
          <span class="font-header leading-4 uppercase">Weather<br/>Tiles</span>
        </RouterLink>
      </div>
      <div class="flex md:hidden">
        <button type="button"
                class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                @click="mobileMenuOpen = true">
          <Bars3Icon class="h-8 w-8" aria-hidden="true"/>
        </button>
      </div>
      <div class="hidden md:flex gap-8 xl:gap-28">
        <RouterLink v-for="link of links" :key="link.to" :to="link.to"
                    class="font-header uppercase text-gray-900 rounded-md px-3 py-2.5 hover:bg-gray-100">
          {{ link.name }}
        </RouterLink>
      </div>
      <div class="hidden md:flex md:flex-1 md:justify-end">
        <LogInButton/>
      </div>
    </nav>
    <TransitionRoot appear :show="mobileMenuOpen"
                    enter="transition-opacity duration-150"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity duration-150"
                    leave-from="opacity-100"
                    leave-to="opacity-0">
      <Dialog as="div" class="md:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <TransitionChild
            enter="transition-opacity duration-150"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-150"
            leave-from="opacity-100"
            leave-to="opacity-0">
          <div class="fixed inset-0 z-10"/>
        </TransitionChild>
        <TransitionChild
            enter="transition-opacity duration-150"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity duration-150"
            leave-from="opacity-100"
            leave-to="opacity-0">
          <DialogPanel
              class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="/icon.svg" alt=""/>
              </a>
              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y">
                <div class="-mx-3 space-y-2 py-6">
                  <RouterLink v-for="link in links" :key="link.to" :to="link.to"
                              class="font-header block uppercase rounded-lg px-3 py-2 leading-7 text-gray-900 hover:bg-gray-100">
                    {{ link.name }}
                  </RouterLink>
                </div>
                <div class="py-6">
                  <LogInButton/>
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </header>
</template>
