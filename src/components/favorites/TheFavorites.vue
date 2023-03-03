<template>
    <div id="favorites" class="bg">
        <div class="container">
            <ul>
                <transition-group name="slide" tag="ul" mode="in-out">

                    <FavoriteItems v-for="town in towns" :key="town.id" :id="town.id" :city="town.city"
                        :icon="town.icon" :text="town.text" :temp="town.temp" />

                </transition-group>
            </ul>
        </div>
    </div>
</template>

<script>
import FavoriteItems from './FavoriteItems.vue'
export default {
    components: {
        FavoriteItems
    },
    data() {
        return {
            towns: [],
        }
    },

    methods: {
        getCity() {
            const localStorageItem = localStorage.getItem('favorites')
            if (localStorageItem) {
                this.towns = JSON.parse(localStorageItem)
            }
        },
        removeFav(id) {
            const favIndex = this.towns.findIndex(res => res.id === id)
            this.towns.splice(favIndex, 1)
            localStorage.setItem('favorites', JSON.stringify(this.towns))
        }
    },

    provide() {
        return {
            removeFav: this.removeFav
        }
    },

    created() {
        this.getCity()
    }
}

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 1s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(200%);
}
</style>