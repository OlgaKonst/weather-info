<template>
  <div class="city-card">
    <h2>Weather in {{ name }}, {{ country }}</h2> 
    <div class="weather-info">
    <h4>{{temp}}&deg; C</h4>
    {{ description }}
    <p>{{currentDate}}</p>
    <table class="table table-bordered table-striped">
      <tbody>
      <tr>
        <td>Wind</td>
        <td>{{ wind }}</td>
      </tr>
      <tr>
        <td>Humidity</td>
        <td>{{ humidity }}%</td>
      </tr>
      <tr>
        <td>Pressure</td>
        <td>{{ pressure }}</td>
      </tr>
       <tr>
        <td>Geo coords</td>
        <td>{{ coord }}</td>
      </tr>
      </tbody>
    </table>
    </div>
    <div class="control">
    <router-link :to="{ name: 'CardsList' }">
      <button class="btn btn-info">Back</button>
    </router-link>
     <button type="button" @click="updateWeather" class="btn btn-info btn-update">Update</button>
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
			id: this.$router.currentRoute.params['id'],
			name: '',
			temp: null,
			country: '',
			description: '',
			pressure: null,
			wind: '',
			humidity: null,
			coord: '',
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
			this.name = weather.city.name;
			this.country = weather.city.country;
			this.description = weather.list[0].weather[0].description;
			this.pressure = weather.list[0].main.pressure;
			this.wind = weather.list[0].wind.speed + ' m/s';
			this.humidity = weather.list[0].main.humidity;
			this.coord = `[${weather.city.coord.lat.toFixed(2)} - ${weather.city.coord.lon.toFixed(2)}]`;
		},
	},
	mounted() {
    this.updateWeather();
    this.$store.dispatch('addCity', this.id);
		this.$store.dispatch('saveSelectedCities');
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
	margin: 20px auto;
}
.weather-info {
	width: 300px;
	margin: 0 auto;
}
.control {
	margin-top: auto;
}
.btn-update {
  margin-left: 20px;
}
</style>
