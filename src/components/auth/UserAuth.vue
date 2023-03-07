<template>
	<div class="auth-card">
		<p class="auth-title">Please Login/Sign Up to see forecast</p>
		<input
			type="email"
			id="email"
			placeholder="Enter your e-mail"
			v-model.trim="email"
		/>
		<input
			type="password"
			id="password"
			placeholder="Enter your password"
			v-model.trim="password"
		/>
		<p style="color: #f6bc84" v-if="successfulSingup">
			Sing Up was successful.
		</p>
		<p style="color: #f6bc84" v-if="validForm">
			Please enter valid email or password
		</p>
		<div class="auth-btns">
			<button class="login" @click="login">Log In</button>
			<button class="singup" @click="singup">Sign Up</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
			validForm: false,
		};
	},
	methods: {
		singup() {
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
				this.validForm = false;
				this.successfulSingup = false;
			}, 5000);
			this.email = "";
			this.password = "";
		},

		login() {
			if (
				!this.email ||
				!this.email.includes("@") ||
				this.password.length < 6
			) {
				this.validForm = true;
			} else {
				this.$store.dispatch("auth/login", {
					email: this.email,
					password: this.password,
				});
			}

			setTimeout(() => {
				this.validForm = false;
			}, 5000);
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
