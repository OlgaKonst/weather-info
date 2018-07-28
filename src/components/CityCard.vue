<template>
<router-link :to="{ name: 'City', params: { id: this.id } }">
    <div class="city-card" @click="showMoreInfo($event)">
    <div class="close-cart" @click="closeCard">Close</div>
    <h3>Weather in {{ name }}, {{ country }}</h3>
    <h4>{{temp}}&deg; C</h4>
    <p>{{currentDate}}</p>
    <button type="button" @click="updateWeather" class="btn-update">Update now</button>
  </div>
</router-link>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import getWeather from '../api';

export default {
	name: 'CityCard',
	props: {
		id: Number,
		name: String,
		country: String,
	},
	data() {
		return {
			weather: {},
			temp: null,
		};
	},
	computed: {
		currentDate() {
			const date = new Date();
			const locale = 'en-us';
			const month = date.toLocaleString(locale, { month: 'short' });
			return `${date.getHours()}:${date.getMinutes()} ${month} ${date.getDate()}`;
		},
	},
	methods: {
		async updateWeather() {
			this.weather = await getWeather(this.id);
			this.temp = (this.weather.list[0].main.temp - 273.15).toFixed(0);
			//console.log('weather ', this.weather);
		},
		closeCard() {
			this.$store.commit('removeCity', this.id);
		},
		showMoreInfo(e) {
			console.log('e.target ', e.target);
			if (e.target.classList.contains('close-card') || e.target.classList.contains('btn-update')) {
				console.log('include');
				return;
			} else {
				this.$store.commit('selectedCard', this.weather);
			}
		},
	},
	mounted() {
		/* this.$store.dispatch('load');
    const updateWeather = async () => {
      const weather = await getWeather(this.id);
      this.temp = (weather.list[0].main.temp - 273.15).toFixed(0);
      console.log(weather)
    } */
		this.updateWeather();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.city-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 300px;
	border: 1px solid green;
	padding: 10px;
	margin: 5px 5px 15px;
}
.close-cart {
	width: 100px;
	border: 1px solid blue;
	align-self: flex-end;
	cursor: pointer;
}
a {
  display: block;
	text-decoration: none;
	color: #000;
}
</style>
