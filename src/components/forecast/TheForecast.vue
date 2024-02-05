<template>
	<main id="main" :class="background">
		<div class="container">
			<div class="main">
				<!-- <button class="logout" v-if="logout" @click="getLogout">
					Log Out
				</button>
				<singup-error v-if="singupError"></singup-error>
				<singin-error v-if="singinError"></singin-error>
				<singup-succ v-if="singupSucc"></singup-succ>
				<user-auth v-if="showAuth"></user-auth> -->
				<form class="form" @submit.prevent="onClick">
					<div class="autocomplete">
						<input
							type="text"
							class="inputText"
							v-model="inputText"
							@keyup="autoComplete"
						/>

						<transition name="fadeSlow">
							<ul v-if="autocompleteIsVisible">
								<auto-complete
									@click="clickCity(city)"
									v-for="(
										city, index
									) in orderedAutoCompleteCities"
									:key="index"
									:cityAC="city.name"
									:countryAC="city.country"
								></auto-complete>
							</ul>
						</transition>
					</div>

					<div class="btns">
						<button class="btn" type="submit">
							<i class="fas fa-search"></i>
						</button>
						<button class="btn" @click="resetForm">
							<i class="fas fa-sync-alt"></i>
						</button>
					</div>
				</form>

				<transition name="slide" mode="out-in">
					<error-message v-if="getError"></error-message>
				</transition>

				<transition name="slide" mode="out-in">
					<div class="forecast" v-if="getData.showForecast">
						<div class="forecastCurrent">
							<div class="left">
								<img
									:src="getData.icon"
									:class="{ icon: !!getData.icon }"
								/>
								<p class="condition">
									{{ getData.text }}
								</p>
							</div>
							<div class="infos">
								<p class="city">{{ getData.city }}</p>
								<p class="country">
									{{ getData.country }}
								</p>
								<p
									class="degree"
									v-if="getData.visibleDegree"
								>
									{{ getData.degree
									}}<span>&#176;</span>
								</p>
								<button
									class="btnFav"
									v-if="!pera && showAddToFavButton"
									@click="addToFavorites"
								>
									Add To Favorites
								</button>
							</div>
						</div>
						<div class="forecastDays">
							<div class="forecastDay">
								<p class="date">
									{{ getData.dateToday }}
								</p>
								<img
									:src="getData.iconToday"
									class="imgSmall"
								/>
								<p class="degreeSmall">
									{{ getData.degreeToday
									}}<span
										v-if="getData.visibleDegree"
										>&#176;</span
									>
								</p>
							</div>
							<div class="forecastDay">
								<p class="date">
									{{ getData.dateTomorow }}
								</p>
								<img
									:src="getData.iconTomorow"
									class="imgSmall"
								/>
								<p class="degreeSmall">
									{{ getData.degreeTomorow
									}}<span
										v-if="getData.visibleDegree"
										>&#176;</span
									>
								</p>
							</div>
							<div class="forecastDay">
								<p class="date">
									{{ getData.dateNextDay }}
								</p>
								<img
									:src="getData.iconNextDay"
									class="imgSmall"
								/>
								<p class="degreeSmall">
									{{ getData.degreeNextDay
									}}<span
										v-if="getData.visibleDegree"
										>&#176;</span
									>
								</p>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</main>
</template>

<script>
import ErrorMessage from "./ErrorMessage.vue";
import AutoComplete from "./AutoComplete.vue";
// import UserAuth from "../auth/UserAuth.vue";
// import SingupError from "../ui/SingupError.vue";
// import SinginError from "../ui/SinginError.vue";
// import SingupSucc from "../ui/SingupSucc.vue";

export default {
	components: {
		ErrorMessage,
		AutoComplete,
		// UserAuth,
		// SingupError,
		// SinginError,
		// SingupSucc,
	},

	data() {
		return {
			nameKeeper: "",
			showAddToFavButton: true,
		};
	},

	methods: {
		onClick() {
			this.loadCity();
			this.redirectToCity();
		},

		loadCity() {
			this.$store.dispatch("forecast/searchCity");
		},

		autoComplete() {
			this.$store.dispatch("forecast/autocompleteCity");
		},

		clickCity(city) {
			this.$store.commit("forecast/CLICK_CITY", city.name);
		},

		resetForm() {
			this.$store.commit("forecast/RESET_FORM");
		},

		redirectToCity() {
			this.$router.push({
				name: "forecast",
				params: { city: this.inputText },
			});
		},

		addToFavorites() {
			this.$store.commit("forecast/ADD_TO_FAVORITES");
			this.showAddToFavButton = false;
		},

		getLogout() {
			this.$store.commit("auth/getLogout");
			this.$store.commit("forecast/DISABLE_FORECAST");
			this.$router.replace("/forecast");
		},
	},

	computed: {
		inputText: {
			get() {
				return this.$store.getters["forecast/getInputText"];
			},
			set(newValue) {
				this.$store.commit("forecast/INPUT_TEXT", newValue);
			},
		},

		getData() {
			const dataInfo = this.$store.getters["forecast/getForecastData"];
			return {
				showForecast: dataInfo.showForecast,
				icon: dataInfo.icon,
				text: dataInfo.text,
				city: dataInfo.city,
				country: dataInfo.country,
				degree: dataInfo.degree,
				visibleDegree: dataInfo.visibleDegree,
				dateToday: dataInfo.dateToday,
				dateTomorow: dataInfo.dateTomorow,
				dateNextDay: dataInfo.dateNextDay,
				iconToday: dataInfo.iconToday,
				iconTomorow: dataInfo.iconTomorow,
				iconNextDay: dataInfo.iconNextDay,
				degreeToday: dataInfo.degreeToday,
				degreeTomorow: dataInfo.degreeTomorow,
				degreeNextDay: dataInfo.degreeNextDay,
				errorMsg: dataInfo.errorMsg,
			};
		},

		getError() {
			return this.$store.getters["forecast/getError"];
		},

		background() {
			return this.$store.getters["forecast/bg"];
		},

		getFavorite() {
			return this.$store.getters["forecast/getFavorites"];
		},

		autocompleteIsVisible() {
			return this.$store.getters["forecast/autoComplete"];
		},

		orderedAutoCompleteCities() {
			return this.$store.getters["forecast/orderAutoComplete"];
		},

		pera() {
			return this.$store.getters["forecast/isCityExict"];
		},

		buttonFav() {
			return this.$store.getters["forecast/btnFav"];
		},

		showMain() {
			return this.$store.getters["auth/showMainForecast"];
		},

		showAuth() {
			return this.$store.getters["auth/showAuth"];
		},

		singupError() {
			return this.$store.getters["auth/singupError"];
		},

		singinError() {
			return this.$store.getters["auth/singinError"];
		},

		singupSucc() {
			return this.$store.getters["auth/singupSucc"];
		},

		logout() {
			return this.$store.getters["auth/logout"];
		},
	},

	watch: {
		"$route.params.city": function () {
			this.nameKeeper = this.inputText;
		},
	},

	created() {
		this.nameKeeper = this.$route.params.city;
		this.inputText = this.$route.params.city;
		this.loadCity();
		this.getFavorite;
		// this.$store.dispatch("auth/autoLogin");
	},

	beforeRouteUpdate(to) {
		this.nameKeeper = to.params.city;
	},
};
</script>

<style>
.coldWeather {
	background: url("../../assets/cold.jpg") no-repeat center center;
	background-size: cover;
}

.warmWeather {
	background: url("../../assets/warm.png") no-repeat center center;
	background-size: cover;
}

.bg {
	background: url("../../assets/bg.jpg") no-repeat center center;
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

.fadeSlow-enter-active,
.fadeSlow-leave-active {
	transition: opacity 0.8s ease-in-out;
}

.fadeSlow-enter-from,
.fadeSlow-leave-to {
	opacity: 0;
}

.noBtn {
	opacity: 0;
}
</style>
