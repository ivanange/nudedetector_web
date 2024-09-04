<template>
    <div class="flex flex-wrap py-6 px-6 justify-between items-center text-gray-600 font-medium">
        <LogoWithText class="order-1" />
        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <ul :class="showMenu ? 'flex' : 'hidden'"
                class="order-4 md:order-2 w-full md:w-auto mt-6 md:mt-0 md:flex flex-col md:flex-row justify-center md:items-center divide-y md:divide-y-0 md:space-x-6">
                <li class="py-2 md:py-0 text-center">
                    <nuxt-link :to="localePath('index')">{{ $t("home") }}</nuxt-link>
                </li>
                <li class="py-2 md:py-0 text-center">
                    <nuxt-link :to="localePath('projects')">{{ $t("projects") }}</nuxt-link>
                </li>
                <li class="py-2 md:py-0 text-center">
                    <nuxt-link :to="localePath('about')">{{ $t("about") }}</nuxt-link>
                </li>
                <li class="py-2 md:py-0 text-center">
                    <nuxt-link :to="localePath('about') + '#contact_us'">{{ $t("contact_us") }}</nuxt-link>
                </li>
            </ul>
        </transition>
        <Menu as="div" class="relative inline-block text-left order-2 md:order-3">
            <div>
                <MenuButton
                    class="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium uppercase focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {{ locale }}
                    <ChevronDownIcon class="ml-1 -mr-1 h-4 w-4 " aria-hidden="true" />
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute cursor-pointer right-3 w-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-for="locale in locales" :key="locale" v-slot="{ active }">
                    <NuxtLink @click="setLocale(locale)" :class="[
                        active ? 'bg-gray-100' : '',
                        'uppercase group flex w-full items-center px-2 py-2 text-sm',
                    ]" :to="switchLocalePath(locale)">
                        {{ locale }}
                    </NuxtLink>
                    </MenuItem>
                </MenuItems>
            </transition>
        </Menu>
        <button class="p-2 md:hidden order-3" @click="showMenu = !showMenu">
            <XMarkIcon class="h-4 w-4 " v-if="showMenu" />
            <Bars2Icon class="h-4 w-4 " v-else />
        </button>
    </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { Bars2Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/outline"

let showMenu = ref(false);
</script>
  