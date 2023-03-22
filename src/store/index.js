import { createStore } from "vuex";
import forecastModule from "./forecast/index.js";
import authModule from "./auth/index.js";
import favoritesModule from "./favorites/index.js";

const store = createStore({
	modules: {
		forecast: forecastModule,
		auth: authModule,
		favorites: favoritesModule,
	},
});

export default store;
