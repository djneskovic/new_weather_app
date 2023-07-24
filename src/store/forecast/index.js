import axios from "axios";

export default {
	namespaced: true,

	state() {
		return {
			btnFav: true,
			inputText: "",
			showForecast: false,
			icon: null,
			text: "",
			city: "",
			country: "",
			degree: null,
			visibleDegree: false,
			dateToday: "",
			dateTomorow: "",
			dateNextDay: "",
			iconToday: null,
			iconTomorow: null,
			iconNextDay: null,
			degreeToday: "",
			degreeTomorow: "",
			degreeNextDay: "",
			errorMsg: false,
			nameKeeper: "",
			favoritesCities: [],
			autoComplete: false,
			autocompleteCities: [],
			disableBtn: false,
			apiSearchUrl: "https://api.weatherapi.com/v1/search.json?key=",
		};
	},

	mutations: {
		SEARCH_FOR_CITY(state, payload) {
			state.showForecast = true;
			state.city = payload.location.name;
			state.country = payload.location.country;
			state.icon = payload.current.condition.icon;
			state.text = payload.current.condition.text;
			state.degree = payload.current.temp_c;
			state.visibleDegree = true;
			state.dateToday = payload.forecast.forecastday[0].date;
			state.dateTomorow = payload.forecast.forecastday[1].date;
			state.dateNextDay = payload.forecast.forecastday[2].date;
			state.iconToday =
				payload.forecast.forecastday[0].day.condition.icon;
			state.iconTomorow =
				payload.forecast.forecastday[1].day.condition.icon;
			state.iconNextDay =
				payload.forecast.forecastday[2].day.condition.icon;
			state.degreeToday =
				payload.forecast.forecastday[0].day.maxtemp_c;
			state.degreeTomorow =
				payload.forecast.forecastday[1].day.maxtemp_c;
			state.degreeNextDay =
				payload.forecast.forecastday[2].day.maxtemp_c;
			state.errorMsg = false;

			state.inputText = "";
			state.autoComplete = false;
			state.autocompleteCities = [];
		},

		WRONG_CITY(state) {
			state.showForecast = false;
			state.autoComplete = false;
			state.autocompleteCities = [];
			state.errorMsg = true;
			state.inputText = "";
		},

		INPUT_TEXT(state, payload) {
			state.inputText = payload;
		},

		RESET_FORM(state) {
			state.showForecast = false;
			state.errorMsg = false;
			state.inputText = "";
			state.autoComplete = false;
		},

		ADD_TO_FAVORITES(state) {
			const favoriteCity = {
				id: Math.floor(Math.random() * 100),
				city: state.city,
				icon: state.icon,
				text: state.text,
				temp: state.degree,
			};

			state.favoritesCities.unshift(favoriteCity);
			localStorage.setItem(
				"favorites",
				JSON.stringify(state.favoritesCities)
			);
		},

		AUTOCOMPLETE_CITY(state, payload) {
			const data = payload;
			data.forEach((find) => {
				state.autocompleteCities.unshift(find);
				const uniqueCity = [
					...new Set(state.autocompleteCities.map((x) => x.id)),
				];
				const newUniqueCity = uniqueCity.map((id) =>
					state.autocompleteCities.find((x) => x.id === id)
				);
				state.autocompleteCities = newUniqueCity;
			});
		},

		CLICK_CITY(state, payload) {
			state.inputText = payload;
			state.autoComplete = false;
		},

		DISABLE_FORECAST(state) {
			state.showForecast = false;
		},
	},

	actions: {
		searchCity({ state, commit, getters }) {
			state.showForecast = false;
			state.errorMsg = false;
			if (!state.inputText) return;

			axios.get(
				`https://api.weatherapi.com/v1/forecast.json?key=c00704bfd174489e9e685223222812&q=${getters.getInputText}&days=5&aqi=no&alerts=no`
			)
				.then((res) => {
					commit("SEARCH_FOR_CITY", res.data);
				})
				.catch(() => {
					commit("WRONG_CITY", "error");
				})
				.finally(() => {
					console.log("Complete");
				});
		},

		autocompleteCity({ state, commit, getters }) {
			state.autoComplete = true;

			if (!state.inputText) {
				this.autoComplete = false;
			}

			axios.get(
				`https://api.weatherapi.com/v1/search.json?key=c00704bfd174489e9e685223222812&q=${getters.getInputText}`
			)
				.then((res) => {
					commit("AUTOCOMPLETE_CITY", res.data);
					// console.log(res.data);
				})
				.catch(() => {
					return (state.autocompleteCities = []);
				});
		},
	},

	getters: {
		getForecastData(state) {
			return {
				showForecast: state.showForecast,
				icon: state.icon,
				text: state.text,
				city: state.city,
				country: state.country,
				degree: state.degree,
				visibleDegree: state.visibleDegree,
				dateToday: state.dateToday,
				dateTomorow: state.dateTomorow,
				dateNextDay: state.dateNextDay,
				iconToday: state.iconToday,
				iconTomorow: state.iconTomorow,
				iconNextDay: state.iconNextDay,
				degreeToday: state.degreeToday,
				degreeTomorow: state.degreeTomorow,
				degreeNextDay: state.degreeNextDay,
			};
		},

		getError(state) {
			return state.errorMsg;
		},

		bg(state) {
			if (state.degree < 10 && state.showForecast)
				return "coldWeather";
			if (state.degree >= 10 && state.showForecast)
				return "warmWeather";

			return "bg";
		},

		getFavorites(state) {
			return (state.favoritesCities = JSON.parse(
				localStorage.getItem("favorites") || "[]"
			));
		},

		autoComplete(state) {
			return state.autoComplete;
		},

		citiesWhichNotStartWithInput(state) {
			if (state.inputText != "" && state.inputText) {
				return state.autocompleteCities.filter(
					(item) =>
						!item.name
							.toLowerCase()
							.includes(state.inputText.toLowerCase())
				);
			}
			return state.autocompleteCities;
		},

		citiesWhichStartWithInput(state) {
			if (state.inputText != "" && state.inputText) {
				return state.autocompleteCities.filter((item) =>
					item.name
						.toLowerCase()
						.includes(state.inputText.toLowerCase())
				);
			}
			return state.autocompleteCities;
		},

		orderAutoComplete(_, getters) {
			return [
				...getters.citiesWhichStartWithInput,
				...getters.citiesWhichNotStartWithInput,
			];
		},

		getInputText(state) {
			return state.inputText;
		},

		isCityExict(state) {
			// const cities = getters.getFavorites;
			const cityA = state.city;
			const cities =
				JSON.parse(localStorage.getItem("favorites")) || [];

			return cities.some((city) => city.city === cityA);
		},

		btnFav(state) {
			return state.btnFav;
		},
	},
};

//* Dobijes podatke iz ls da li postoji taj grad
//* Ako se taj grad poklapa sa inputom, onda se ukloni dugme
