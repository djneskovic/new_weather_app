export default {
	namespaced: true,

	state() {
		return {
			towns: [],
		};
	},

	mutations: {
		GET_CITY(state) {
			const localStorageItem = localStorage.getItem("favorites");
			if (localStorageItem) {
				state.towns = JSON.parse(localStorageItem);
			}
		},

		REMOVE_FAV(state, payload) {
			const favIndex = state.towns.findIndex(
				(res) => res.id === payload
			);
			state.towns.splice(favIndex, 1);
			localStorage.setItem("favorites", JSON.stringify(state.towns));
		},
	},

	getters: {
		getTowns(state) {
			return state.towns;
		},
	},
};
