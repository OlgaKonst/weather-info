<template>
  <div class="city-card" @click="showMoreInfo($event)">
    <router-link :to="{ name: 'City', params: { id: id } }" class="router-link">
      <div class="info">
        Weather in <div class="title">{{ name }}, {{ country }}</div>
        <div class="temperature">{{temp}}&deg; C</div>
        <p>{{date}}</p>
      </div>
    </router-link>
    <div class="control">
      <button type="button" @click="closeCard" class="btn btn-info btn-close">Close</button>
      <button type="button" @click="updateWeather" class="btn btn-info">Update</button>
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
      date: null,
		};
	},
	methods: {
		async updateWeather() {
			this.weather = await getWeather(this.id);
      this.temp = (this.weather.list[0].main.temp - 273.15).toFixed(0);
      const date = new Date();
			const locale = 'en-us';
      const month = date.toLocaleString(locale, { month: 'short' });
      this.date = `${date.getHours()}:${date.getMinutes()} ${month} ${date.getDate()}`;
		},
		closeCard() {
      this.$store.commit('removeCity', this.id);
      this.$store.dispatch('saveSelectedCities');
		},
		showMoreInfo(e) {
		  this.$store.commit('saveSelectedId', this.id);
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
  background-color: #f2ebeb;
  border-radius: 5px;
}
.btn {
	width: 100px;
	align-self: flex-end;
	cursor: pointer;
}
.title {
  font-size: 28px;
}
.temperature {
  font-size: 24px;
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
.btn-close {
  margin-right: 20px;
}
</style>
