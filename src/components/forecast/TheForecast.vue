<template>
    <main id="main" :class="background">
        <div class="container">
            <div class="main">

                <form class="form" @submit.prevent="onClick">
                    <div class="autocomplete">
                        <input type="text" class="inputText" v-model="inputText" @keyup="autocompleteCity">
                        <ul v-if="autoComplete">
                            <auto-complete v-for="city in autocompleteCities" :key="city.id" :cityAC="city.name"
                                :regionAc="city.region" :countryAC="city.country"></auto-complete>
                        </ul>
                    </div>
                    <div class="btns">
                        <button class="btn" type="submit"><i class="fas fa-search"></i></button>
                        <button class="btn" @click="resetForm"><i class="fas fa-sync-alt"></i></button>
                    </div>
                </form>

                <error-message v-if="errorMsg"></error-message>

                <transition name="slide" mode="out-in">

                    <div class="forecast" v-if="showForecast">

                        <div class="forecastCurrent">

                            <div class="left">

                                <img :src="icon" :class="{ icon: icon }">
                                <p class="condition">{{ text }}</p>

                            </div>

                            <div class="infos">
                                <p class="city">{{ city }}</p>
                                <p class="country">{{ country }}</p>
                                <p class="degree" v-if="visibleDegree">{{ degree }}<span>&#176;</span></p>
                                <button class="btnFav" @click="addToFavorite">Add to Favorite</button>
                            </div>
                        </div>

                        <div class="forecastDays">
                            <div class="forecastDay">
                                <p class="date">{{ dateToday }}</p>
                                <img :src="iconToday" class="imgSmall">
                                <p class="degreeSmall">{{ degreeToday }}<span v-if="visibleDegree">&#176;</span></p>
                            </div>

                            <div class="forecastDay">
                                <p class="date">{{ dateTomorow }}</p>
                                <img :src="iconTomorow" class="imgSmall">
                                <p class="degreeSmall">{{ degreeTomorow }}<span v-if="visibleDegree">&#176;</span></p>
                            </div>

                            <div class="forecastDay">
                                <p class="date">{{ dateNextDay }}</p>
                                <img :src="iconNextDay" class="imgSmall">
                                <p class="degreeSmall">{{ degreeNextDay }}<span v-if="visibleDegree">&#176;</span></p>
                            </div>
                        </div>

                    </div>

                </transition>

            </div>

        </div>
    </main>
</template>

<script>
import axios from 'axios';
import ErrorMessage from './ErrorMessage.vue';
import AutoComplete from './AutoComplete.vue';

export default {
    components: {
        ErrorMessage,
        AutoComplete
    },

    inject: ['apiKey', 'apiForecastUrl', 'apiSearchUrl'],

    data() {
        return {
            btnFav: false,
            inputText: '',
            showForecast: false,
            icon: null,
            text: '',
            city: '',
            country: '',
            degree: null,
            visibleDegree: false,
            dateToday: '',
            dateTomorow: '',
            dateNextDay: '',
            iconToday: null,
            iconTomorow: null,
            iconNextDay: null,
            degreeToday: '',
            degreeTomorow: '',
            degreeNextDay: '',
            errorMsg: false,
            nameKeeper: '',
            favoritesCities: [],
            autoComplete: false,
            autocompleteCities: []
        }
    },

    methods: {
        searchForCity() {
            if (!this.inputText) return;
            this.showForecast = false;

            axios.get(`${this.apiForecastUrl}${this.apiKey}&q=${this.inputText}&days=5&aqi=no&alerts=no`)
                .then(res => {
                    const data = res.data;
                    console.log(data);
                    this.errorMsg = false;
                    this.showForecast = true;
                    this.autoComplete = false;
                    //* 
                    const icon = data.current.condition.icon;
                    this.icon = icon;
                    //*
                    const text = data.current.condition.text;
                    this.text = text;
                    //*
                    const city = data.location.name;
                    this.city = city
                    //*
                    const country = data.location.country;
                    this.country = country;
                    //* 
                    const degree = data.current.temp_c;
                    this.degree = degree;
                    this.visibleDegree = true;
                    //*
                    const dateToday = data.forecast.forecastday[0].date;
                    this.dateToday = dateToday;
                    const dateTomorow = data.forecast.forecastday[1].date;
                    this.dateTomorow = dateTomorow;
                    const dateNextDay = data.forecast.forecastday[2].date;
                    this.dateNextDay = dateNextDay;
                    //*
                    const iconToday = data.forecast.forecastday[0].day.condition.icon;
                    this.iconToday = iconToday;
                    const iconTomorow = data.forecast.forecastday[1].day.condition.icon;
                    this.iconTomorow = iconTomorow;
                    const iconNextDay = data.forecast.forecastday[2].day.condition.icon;
                    this.iconNextDay = iconNextDay;
                    //*
                    const degreeToday = data.forecast.forecastday[0].day.maxtemp_c;
                    this.degreeToday = degreeToday;
                    const degreeTomorow = data.forecast.forecastday[1].day.maxtemp_c;
                    this.degreeTomorow = degreeTomorow;
                    const degreeNextDay = data.forecast.forecastday[2].day.maxtemp_c;
                    this.degreeNextDay = degreeNextDay;
                    //*
                })
                .catch(() => {
                    //? Napravi za error sta treba
                    this.errorMsg = true;
                    this.showForecast = false;
                })
                .finally(() => {
                    console.log('Complete');
                })

            this.inputText = '';
        },

        autocompleteCity() {
            this.autoComplete = true;

            if (!this.inputText) {
                this.autoComplete = false;
            }

            axios.get(`${this.apiSearchUrl}${this.apiKey}&q=${this.inputText}`)
                .then(res => {
                    const data = res.data;
                    // const findCity = data.find(cityFind => cityFind.id === cityFind.id)
                    // if (!findCity) {
                    //     this.autocompleteCities = [];
                    //     return
                    // } else {
                    //     this.autocompleteCities.push(findCity)
                    //     console.log(findCity);
                    // }

                    data.forEach(find => {
                        console.log(find);
                        // if (find === this.autocompleteCities) {
                        //     return
                        // } else {
                        //     this.autocompleteCities.push(find)
                        // }
                    })


                })
        },

        redirectToCity() {
            this.$router.push({ name: 'forecast', params: { city: this.inputText } })
        },

        resetForm() {
            this.showForecast = false;
            this.errorMsg = false;
        },

        onClick() {
            this.redirectToCity();
            this.searchForCity();
        },

        addToFavorite() {
            const favoriteCity = {
                id: Math.floor(Math.random() * 100),
                city: this.city,
                icon: this.icon,
                text: this.text,
                temp: this.degree,
            };

            this.favoritesCities.push(favoriteCity);

            localStorage.setItem('favorites', JSON.stringify(this.favoritesCities))

        },
    },

    computed: {
        background() {
            if (this.degree < 10 && this.showForecast === true) {
                return 'coldWeather'
            }
            if (this.degree >= 10 && this.showForecast === true) {
                return 'warmWeather'
            }
            return 'bg'
        }
    },

    watch:
    {
        '$route.params.city': function (city) {
            console.log(city)
            this.nameKeeper = this.inputText;
        },
    },

    created() {
        this.nameKeeper = this.$route.params.city;
        this.inputText = this.$route.params.city;
        this.searchForCity();
        this.favoritesCities = JSON.parse(localStorage.getItem('favorites'))
    },

    beforeRouteUpdate(to) {
        this.nameKeeper = to.params.city;
    },
}
</script>

//? Ispravi za navigaciju da se zatvori kada kliknes na link - uradjeno
//? Uradi storage 
    //* Pogledaj zasto se svaki put brise stari ls kada dodas u favorites
    //* Napravi izgled, razmisli kako bi voleo da izgleda

<style>
.coldWeather {
    background: url('../../assets/cold.jpg') no-repeat center center;
    background-size: cover;
}

.warmWeather {
    background: url('../../assets/warm.png') no-repeat center center;
    background-size: cover;
}

.bg {
    background: url('../../assets/bg.jpg') no-repeat center center;
    background-size: cover;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-200%);
}
</style>