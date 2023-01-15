<template>
    <main id="main" :class="background">
        <div class="container">
            <div class="main">

                <form class="form" @submit.prevent="onClick">
                    <input type="text" class="inputText" v-model="inputText">
                    <div class="btns">
                        <button class="btn" type="submit"><i class="fas fa-search"></i></button>
                        <button class="btn" @click="resetForm"><i class="fas fa-sync-alt"></i></button>
                    </div>
                </form>

                <error-message v-if="errorMsg"></error-message>

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
                            <button class="btnFav">Add to Favorite</button>
                            <button class="btnFav">Remove to Favorite</button>
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


            </div>

        </div>
    </main>
</template>

<script>
import axios from 'axios';
import ErrorMessage from './ErrorMessage.vue';

export default {
    components: {
        ErrorMessage
    },

    inject: ['apiKey', 'apiForecastUrl'],

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
            nameKeeper: ''
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
                    console.log(data.forecast.forecastday[0].day.condition.text);
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

            this.inputText = ''
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
        }
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
        }
    },

    created() {
        this.nameKeeper = this.$route.params.city;
        this.inputText = this.$route.params.city;
        this.searchForCity();
    },

    beforeRouteUpdate(to) {
        this.nameKeeper = to.params.city;
        console.log(to);
    }
}
</script>

//? Ispravi za navigaciju da se zatvori kada kliknes na link
//? Uradi storage

<style>
/* .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
} */

/* .form {
    margin: 4rem 0;
    display: flex;
    flex-direction: column;
} */

/* .inputText {
    font-size: 1.5rem;
    padding: .3rem .2rem;
    border-radius: 10px;
    border: 1px solid #302f4e;
    width: 100%;
} */

/* .inputText:focus {
    outline: none;
    border: 1px solid #f6bc84;
} */

/* .btns {
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    font-size: 1.25rem;
    background-color: #f6bc84;
    border: none;
    border-radius: 10px;
    margin: 0.8rem .5rem;
    padding: .3rem;
    color: #302f4e;
    cursor: pointer;
}

.btn:hover {
    background-color: #302f4e;
    color: #f6bc84;
} */

/*  */

/* .forecast { */
/* width: 100%; */
/* background-color: rgb(0, 0, 0, .15);
    width: 300px;
    margin: 0 2rem;
}

.forecastCurrent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-top: 1rem;
} */

/* .icon {
    width: 100px;
    height: 100px;
} */

/* .condition {
    font-size: 1.5rem;
    margin-top: -1.5rem;
} */

/* .infos {
    margin: 1rem 0;
}

.city,
.country,
.degree {
    font-size: 1.5rem;
} */

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
</style>