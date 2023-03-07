<template>
	<div class="overlay"></div>
	<div class="error-singup">
		<p>Failed to sign up!</p>
		<p>User already exist.</p>
		<button class="btn-error" @click="close">Close</button>
	</div>
</template>

<script>
export default {
	methods: {
		close() {
			this.$store.commit("auth/close");
		},
	},
};
</script>

<style scoped>
.overlay {
	position: fixed;
	background-color: rgba(0, 0, 0, 0.8);
	inset: 0;
	width: 100%;
	height: 100%;
}
.error-singup {
	background-color: rgba(255, 255, 255, 0.5);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 3rem 1rem;
	font-size: 1.5rem;
	color: #01071a;
	border-radius: 10px;
	position: absolute;
	z-index: 10;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.btn-error {
	border: none;
	border-radius: 10px;
	background-color: #01071a;
	color: #f6bc84;
	padding: 0.4rem 2rem;
	margin-top: 1rem;
	cursor: pointer;
}

p {
	font-size: 1rem;
}

@media screen and (min-width: 600px) {
	.error-singup {
		padding: 3rem 2rem;
	}

	p {
		font-size: 1.25rem;
	}
}

@media screen and (min-width: 600px) {
	p {
		font-size: 1.5rem;
	}
}
</style>
