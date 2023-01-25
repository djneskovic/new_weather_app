<template>
    <the-navigation></the-navigation>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>


</template>

<script>
import TheNavigation from './components/navigation/TheNavigation.vue'
export default {
    components: {
        TheNavigation
    },
    data() {
        return {
            apiKey: 'c00704bfd174489e9e685223222812',
            apiForecastUrl: 'https://api.weatherapi.com/v1/forecast.json?key=',
            apiSearchUrl: 'https://api.weatherapi.com/v1/search.json?key='
        }
    },

    provide() {
        return {
            apiKey: this.apiKey,
            apiForecastUrl: this.apiForecastUrl,
            apiSearchUrl: this.apiSearchUrl
        }
    }

}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>