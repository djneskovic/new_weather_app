<template>
    <li>
        <p>{{ cityAC }}, {{ regionAc }} ,{{ countryAC }} </p>
    </li>
</template>

<script>
export default {
    props: ['idAC', 'cityAC', 'regionAc', 'countryAC']
}
</script>