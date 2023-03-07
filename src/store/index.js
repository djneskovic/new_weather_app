import { createStore } from "vuex";
import forecastModule from "./forecast/index.js";
import authModule from "./auth/index.js";

const store = createStore({
	modules: {
		forecast: forecastModule,
		auth: authModule,
	},
});

export default store;
