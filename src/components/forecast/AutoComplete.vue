<template>
    <li>
        <p>{{ cityAC }}, {{ countryAC }} </p>
    </li>
</template>

<script>
export default {
    props: ['idAC', 'cityAC', 'regionAc', 'countryAC']
}
</script>