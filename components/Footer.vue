<template>
    <footer class="text-gray-600 body-font py-12">
        <div class="flex flex-wrap md:text-left text-center -mb-10 -mx-4">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 class="title-font font-semibold text-gray-800 text-sm uppercase mb-3">
                    {{ $t('company') }}
                </h2>
                <nav class="list-none mb-10 space-y-4">
                    <li>
                        <nuxt-link :to="localePath('about')" class="text-gray-500 hover:text-gray-700">
                            {{ $t('about') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="localePath('about') + '#contact_us'"
                            class="text-gray-500 hover:text-gray-700">{{
                                $t("contact_us") }}</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="text-gray-500 hover:text-gray-700">
                            {{ $t('team') }}
                        </nuxt-link>
                    </li>
                </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 class="title-font font-semibold text-gray-800 text-sm uppercase mb-3">
                    {{ $t('legal') }}
                </h2>
                <nav class="list-none mb-10 space-y-4">
                    <li>
                        <nuxt-link class="text-gray-500 hover:text-gray-700">
                            {{ $t('privacy_policy') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="text-gray-500 hover:text-gray-700">
                            {{ $t('terms_and_conditions') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link class="text-gray-500 hover:text-gray-700">
                            {{ $t('eula') }}
                        </nuxt-link>
                    </li>
                </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 class="title-font font-semibold text-gray-800 text-sm uppercase mb-3">
                    {{ $t('social') }}
                </h2>
                <nav class="list-none mb-10 space-y-4">
                    <li>
                        <nuxt-link href="https://www.facebook.com/laahtech/" class="text-gray-500 hover:text-gray-700">
                            Facebook
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link href="https://x.com/laahtech" class="text-gray-500 hover:text-gray-700">
                            Twitter
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link href="https://www.linkedin.com/company/laahtech"
                            class="text-gray-500 hover:text-gray-700">
                            LinkedIn
                        </nuxt-link>
                    </li>
                </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 class="title-font font-semibold text-gray-800 text-sm uppercase mb-3">
                    {{ $t('partners') }}
                </h2>
                <nav class="list-none mb-10 space-y-4">
                    <li>
                        <nuxt-link href="https://www.multra.de" class="text-gray-500 hover:text-gray-700">
                            Multra GmbH
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link href="https://www.flieger-club.eu" class="text-gray-500 hover:text-gray-700">
                            Flieger Club
                        </nuxt-link>
                    </li>
                </nav>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center space-y-4 pt-20">
            <LogoWithText />
            <span class="text-gray-500">
                &copy; {{ new Date().getFullYear() }}
                <span class="font-bold">La'ahTech</span>.
                {{ $t('all_rights_reserved') }}.
            </span>
            <div class="space-x-6 text-gray-400 flex items-center justify-center">
                <nuxt-link href="https://www.facebook.com/laahtech/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M16.0352 13.125L16.5273 9.89062H13.3984V7.78125C13.3984 6.86719 13.8203 6.02344 15.2266 6.02344H16.668V3.24609C16.668 3.24609 15.3672 3 14.1367 3C11.5703 3 9.88281 4.58203 9.88281 7.39453V9.89062H7V13.125H9.88281V21H13.3984V13.125H16.0352Z"
                            fill="#9CA3AF" />
                    </svg>
                </nuxt-link>
                <nuxt-link href="https://x.com/laahtech">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                        <path fill="#9CA3AF"
                            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                </nuxt-link>
                <nuxt-link href="https://www.linkedin.com/company/laahtech">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512">
                        <path
                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                            fill="#9CA3AF" />
                    </svg>
                </nuxt-link>
            </div>
        </div>
    </footer>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronDownIcon } from "@heroicons/vue/24/outline"
</script>
