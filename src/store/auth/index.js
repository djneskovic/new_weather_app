import axios from "axios";

let timer;

export default {
	namespaced: true,

	state() {
		return {
			showMain: false,
			showAuth: true,
			userId: null,
			token: null,
			singupSucc: false,
			singupError: false,
			singinError: false,
			logout: false,
		};
	},

	getters: {
		showMainForecast(state) {
			return state.showMain;
		},

		showAuth(state) {
			return state.showAuth;
		},

		singupError(state) {
			return state.singupError;
		},

		singinError(state) {
			return state.singinError;
		},

		singupSucc(state) {
			return state.singupSucc;
		},

		logout(state) {
			return state.logout;
		},

		showForecastAuth(state) {
			return state.showForecastAuth;
		},
	},

	mutations: {
		setUser(state, payload) {
			state.userId = payload.userId;
			state.token = payload.token;
		},

		getSingupError(state) {
			state.singupError = true;
		},

		getSinginError(state) {
			state.singinError = true;
		},

		getSingupSucc(state) {
			state.singupSucc = true;
		},

		close(state) {
			state.singupError = false;
			state.singinError = false;
			state.singupSucc = false;
		},

		getLogout(state) {
			state.logout = false;
			state.showMain = false;
			state.showAuth = true;
			state.token = null;
			state.userId = null;

			localStorage.removeItem("token");
			localStorage.removeItem("userId");
			localStorage.removeItem("tokenExp");

			clearTimeout(timer);
		},

		getLogin(state) {
			state.showMain = true;
			state.showAuth = false;
			state.logout = true;
		},
	},

	actions: {
		singup(context, payload) {
			axios.post(
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD71MnLG5OQ7KLBD_ejxtHWKePe8tm6z5Q",
				{
					email: payload.email,
					password: payload.password,
				}
			)
				.then((res) => {
					const data = res.data;
					context.commit("setUser", {
						userId: data.userId,
						token: data.token,
					});
					context.commit("getSingupSucc");
				})
				.catch(() => {
					context.commit("getSingupError");
				});
		},

		login(context, payload) {
			axios.post(
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD71MnLG5OQ7KLBD_ejxtHWKePe8tm6z5Q ",
				{
					email: payload.email,
					password: payload.password,
				}
			)
				.then((res) => {
					const data = res.data;
					// console.log(data);

					const expiresIn = 300000;
					const expDate = new Date().getTime() + expiresIn;

					localStorage.setItem("token", data.idToken);
					localStorage.setItem("userId", data.localId);
					localStorage.setItem("tokenExp", expDate);

					timer = setTimeout(() => {
						context.commit("getLogout");
					}, expiresIn);

					context.commit("setUser", {
						userId: data.localId,
						token: data.idToken,
					});

					context.commit("getLogin");
				})
				.catch(() => {
					context.commit("getSinginError");
				});
		},

		autoLogin(context) {
			const token = localStorage.getItem("token");
			const userId = localStorage.getItem("userId");
			const tokenExp = localStorage.getItem("tokenExp");

			const expiresIn = +tokenExp - new Date().getTime();

			if (expiresIn < 0) return;

			timer = setTimeout(() => {
				context.commit("getLogout");
			}, expiresIn);

			if (token && userId) {
				context.commit("getLogin");
			}
		},
	},
};
