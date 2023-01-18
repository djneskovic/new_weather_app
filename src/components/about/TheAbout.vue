<template>
    <div id="about" class="bg">

        <div class="container">

            <div class="about">

                <h2>Who Am I?</h2>
                <div class="aboutImg">
                    <img src="../../assets/me.jpg" alt="">
                </div>

                <about-item></about-item>

            </div>

        </div>

    </div>
</template>

<script>
import AboutItem from './AboutItem.vue'
export default {
    components: {
        AboutItem
    },
}
</script>

<style scoped>

</style>