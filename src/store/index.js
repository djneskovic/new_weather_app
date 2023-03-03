import { createStore } from "vuex";
import forecastModule from './forecast/index.js'

const store = createStore({
    modules: {
        forecast: forecastModule
    },

})

export default store;