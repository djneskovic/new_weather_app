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
            apiForecastUrl: 'https://api.weatherapi.com/v1/forecast.json?key='
        }
    },

    provide() {
        return {
            apiKey: this.apiKey,
            apiForecastUrl: this.apiForecastUrl
        }
    }

}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>