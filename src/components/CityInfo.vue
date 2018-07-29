<template>
  <div class="city-card">
    <h2>Weather in </h2>   
    <p>{{currentDate}}</p>
    <div class="control">
    <button type="button" @click="updateWeather">Update</button>
    <router-link :to="{ name: 'CardsList' }"><button>Back</button></router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapActions } from 'vuex';
import getWeather from '../api';

export default {
	name: 'CityInfo',
	data() {
		return {
      name: '',
      temp: null,
      country: '',
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
     // this.temp = (weather.list[0].main.temp - 273.15).toFixed(0);
      //this.name = weather.city.name;
      //this.country = weather.city.country;
			console.log('weather', weather);
    },
	},
	mounted() {
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
	width: 600px;
	background-color: #fff;
	padding: 10px;
	margin: 0 auto;
}
.control {
  margin-top: auto;
}
</style>
