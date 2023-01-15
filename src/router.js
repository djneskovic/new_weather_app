import { createRouter, createWebHistory } from "vue-router";

import TheForecast from './components/forecast/TheForecast.vue';
import TheFavorites from './components/favorites/TheFavorites.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', redirect: '/forecast'
        },
        { name: 'forecast', path: '/forecast/:city?', component: TheForecast },
        { name: 'favorites', path: '/favorites', component: TheFavorites }
    ]
})

export default router