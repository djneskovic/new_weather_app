<template>
	<div v-if="isLoading">
		<base-spinner></base-spinner>
	</div>
	<div class="auth-card">
		<p class="auth-title">Please Login/Sign Up to see forecast</p>
		<div class="form__group field">
			<input
				type="email"
				id="email"
				class="form__field"
				placeholder="Enter your e-mail"
				v-model.trim="email"
			/>
			<label for="email" class="form__label">Email</label>
		</div>

		<div class="form__group field">
			<input
				type="password"
				id="password"
				class="form__field"
				placeholder="Enter your password"
				v-model.trim="password"
			/>
			<label for="password" class="form__label">Password</label>
		</div>
		<p style="color: #f6bc84" v-if="successfulSingup">
			Sing Up was successful.
		</p>
		<p style="color: #f6bc84; margin-top: 1rem" v-if="validForm">
			Please enter valid email or password
		</p>
		<div class="auth-btns">
			<button @click="login">Log In</button>
			<button @click="singup">Sign Up</button>
		</div>
	</div>
</template>

<script>
import BaseSpinner from "../ui/BaseSpinner.vue";
export default {
	components: {
		BaseSpinner,
	},

	data() {
		return {
			email: "",
			password: "",
			validForm: false,
			isLoading: false,
		};
	},
	methods: {
		singup() {
			this.isLoading = true;

			if (
				!this.email ||
				!this.email.includes("@") ||
				this.password.length < 6
			) {
				this.validForm = true;
			} else {
				this.$store.dispatch("auth/singup", {
					email: this.email,
					password: this.password,
				});
			}

			setTimeout(() => {
				this.isLoading = false;
			}, 500);

			setTimeout(() => {
				this.validForm = false;
				this.successfulSingup = false;
			}, 5000);
			this.email = "";
			this.password = "";
		},

		login() {
			this.isLoading = true;
			if (
				!this.email ||
				!this.email.includes("@") ||
				this.password.length < 6
			) {
				this.validForm = true;
				setTimeout(() => {
					this.isLoading = false;
				}, 500);
			} else {
				this.$store.dispatch("auth/login", {
					email: this.email,
					password: this.password,
				});
			}

			setTimeout(() => {
				this.validForm = false;
			}, 5000);

			setTimeout(() => {
				this.isLoading = false;
			}, 500);

			this.email = "";
			this.password = "";
		},
	},

	computed: {
		successfulSingup() {
			return this.$store.getters["auth/successfulSingup"];
		},
	},
};
</script>
