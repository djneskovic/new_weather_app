<template>
	<div id="favorites" class="bg">
		<div class="container">
			<ul>
				<transition-group name="slide" tag="ul" mode="in-out">
					<FavoriteItems
						v-for="town in towns"
						:key="town.id"
						:id="town.id"
						:city="town.city"
						:icon="town.icon"
						:text="town.text"
						:temp="town.temp"
					/>
				</transition-group>
			</ul>
		</div>
	</div>
</template>

<script>
import FavoriteItems from "./FavoriteItems.vue";
export default {
	components: {
		FavoriteItems,
	},

	computed: {
		towns() {
			return this.$store.getters["favorites/getTowns"];
		},
	},

	methods: {
		getCity() {
			this.$store.commit("favorites/GET_CITY");
		},
		removeFav(id) {
			this.$store.commit("favorites/REMOVE_FAV", id);
		},
	},

	provide() {
		return {
			removeFav: this.removeFav,
		};
	},

	created() {
		this.getCity();
	},
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
	transition: transform 1s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateX(200%);
}
</style>
