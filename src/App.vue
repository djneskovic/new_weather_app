<template>
    <the-navigation></the-navigation>
    <router-view></router-view>

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


//? Napravi url 
//? Napravi key 
//? To provajduj u TheForecast