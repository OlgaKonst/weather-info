<template>
  <div class="city-card" @click="showMoreInfo($event)">
      <div class="info">
        <h3>Weather in {{ name }}, {{ country }}</h3>
        <h4>{{temp}}&deg; C</h4>
        <p>{{currentDate}}</p>
      </div>
    <div class="control">
      <button type="button" @click="closeCard" class="btn">Close</button>
      <button type="button" @click="updateWeather" class="btn">Update</button>
    </div>
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
		},
		closeCard() {
      this.$store.commit('removeCity', this.id);
      this.$store.dispatch('saveSelectedCities');
		},
		showMoreInfo(e) {
		  this.$store.commit('selectedCard', this.weather);
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
	justify-content: flex-start;
	width: 300px;
	padding: 10px;
	margin: 5px 5px 15px;
  padding: 20px 10px;
  background-color: #fff;
}
.btn {
	width: 100px;
	align-self: flex-end;
	cursor: pointer;
}

.router-link {
  display: flex;
	text-decoration: none;
	color: #2c3e50;
  	flex-direction: column;
	justify-content: space-between;
  align-items: center;
}
.control {
  margin-top: auto;
}
</style>
