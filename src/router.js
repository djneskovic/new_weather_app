import { createRouter, createWebHistory } from "vue-router";

import TheForecast from './components/forecast/TheForecast.vue';
import TheFavorites from './components/favorites/TheFavorites.vue';
import TheAbout from './components/about/TheAbout.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', redirect: '/forecast'
        },
        { name: 'forecast', path: '/forecast/:city?', component: TheForecast },
        { name: 'favorites', path: '/favorites', component: TheFavorites },
        { name: 'about', path: '/about', component: TheAbout }
    ]
})

export default router