<template>
  <div class="city-card">
    <div class="close-cart" @click="closeCard">Close</div>
    <h2>Weather in {{ name }}, {{ country }}</h2>
    <h4>{{temp}}&deg; C</h4>
    <p>{{currentDate}}</p>
    <button type="button" @click="updateWeather">Update</button>
  </div>
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
			const weather = await getWeather(this.id);
			this.temp = (weather.list[0].main.temp - 273.15).toFixed(0);
			console.log(weather);
    },
    closeCard() {
      this.$store.dispatch('closeCard', this.id);
    }
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
</style>
