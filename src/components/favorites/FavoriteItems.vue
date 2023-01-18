<template>
    <li class="favItem">
        <h3 class="favCity">{{ city }}</h3>
        <img :src="icon" class="favIcon">
        <p class="favText"> {{ text }}</p>
        <p class="favTemp">{{ temp }} <span>&#176;</span></p>
        <button class="removeFav" @click="removeFav(id)">Remove</button>
    </li>
</template>

<script>
export default {
    props: ['id', 'city', 'icon', 'text', 'temp'],
    inject: ['removeFav']
}
</script>

<style scoped>

</style>