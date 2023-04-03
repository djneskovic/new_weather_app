<template>
	<nav id="navigation">
		<div class="container">
			<div class="navigation">
				<div class="logo">
					<img
						src="../../assets/logo-removebg-preview.png"
						alt=""
					/>
				</div>

				<div class="hamburger" @click="toggle">
					<i class="fas fa-bars"></i>
				</div>

				<div
					class="nav-content"
					:class="{ 'nav-content--active': toggleMenu }"
				>
					<ul class="nav-list">
						<li class="nav-item" @click="close">
							<router-link to="/forecast"
								>Forecast</router-link
							>
						</li>
						<li class="nav-item" @click="close">
							<router-link to="/favorites"
								>Favorite</router-link
							>
						</li>
						<li class="nav-item" @click="close">
							<router-link to="/about"
								>About Me</router-link
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			toggleMenu: false,
		};
	},
	methods: {
		toggle() {
			this.toggleMenu = !this.toggleMenu;
		},
		close() {
			this.toggleMenu = false;
		},
	},
};
</script>

<style scoped>
#navigation {
	background-color: #01071a;
	/* position: relative; */
	overflow: hidden;
}

.navigation {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;
}

.logo {
	width: 100px;
	height: 100px;
}

.hamburger {
	font-size: 2rem;
	color: white;
	display: none;
}

.nav-content {
	position: static;
}

.nav-content .nav-list {
	display: flex;
}

.nav-content .nav-list li {
	padding: 0 1rem;
}

.nav-content .nav-list li a {
	color: white;
	text-decoration: none;
	/* font-size: 25px; */
	border: none;
	background: none;
}

.nav-content .nav-list li a::before {
	margin-left: auto;
}

.nav-content .nav-list li a::after,
.nav-content .nav-list li a::before {
	content: "";
	width: 0%;
	height: 1px;
	background: #f6bc84;
	display: block;
	transition: 0.5s;
}

.nav-content .nav-list li a:hover::after,
.nav-content .nav-list li a:hover::before {
	width: 100%;
}

@media screen and (max-width: 800px) {
	.logo {
		width: 85px;
		height: 85px;
	}

	.hamburger {
		display: block;
		color: #f6bc84;
		cursor: grab;
	}

	.nav-content {
		position: absolute;
		width: 100%;
		right: 0%;
		top: -100%;
		text-align: center;
		margin-top: 5.3rem;
		transition: all 0.2s ease;
		z-index: 2;
	}

	.nav-content--active {
		top: 0;
	}

	.nav-content .nav-list {
		display: flex;
		flex-direction: column;
	}

	.nav-content .nav-list li {
		padding: 1rem 0;
		background-color: #01071a;
	}

	.nav-content .nav-list li a:hover {
		color: #f6bc84;
	}
}
</style>
