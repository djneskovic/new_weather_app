<template>
    <div id="favorites" class="bg">
        <div class="container">
            <ul>
                <FavoriteItems v-for="town in towns" :key="town.id" :id="town.id" :city="town.city" :icon="town.icon"
                    :text="town.text" :temp="town.temp" />
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
        console.log(this.towns);
    }
}

</script>

<style>

</style>