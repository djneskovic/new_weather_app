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
	background-color: white;
	transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1),
		0 0 0 2px rgb(190, 190, 190), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
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
	margin-top: 1rem;
	padding: 10px 15px;
	border: unset;
	border-radius: 10px;
	color: #f6bc84;
	z-index: 1;
	background: #01071a;
	position: relative;
	font-size: 17px;
	-webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
	box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
	transition: all 250ms;
	overflow: hidden;
	cursor: pointer;
}

.btn-error::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 0;
	border-radius: 10px;
	background-color: #f6bc84;
	z-index: -1;
	-webkit-box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
	box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
	transition: all 250ms;
}

.btn-error:hover {
	color: #01071a;
}

.btn-error:hover::before {
	width: 100%;
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
