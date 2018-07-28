<template>
  <div>
    <form class="select-city">
    <div class="form-group">
      <label for="cities">Choose a city</label>
      <select class="form-control" id="cities" v-model="city" @change="addCity($event)">
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{city.name}}
        </option>
      </select>
    </div>
    </form>
    <p>{{city}}</p>
    <div class="city-list">
      <CityCard v-for="city in selectedCities" :name="city.name"
      :country="city.country" :id="city.id" :key="city.id"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import CityCard from '@/components/CityCard';
import { mapState, mapActions } from 'vuex';

export default {
	name: 'CadrsList',
	components: {
		CityCard,
	},
	data() {
		return {
			city: '',
		};
	},
	computed: {
		...mapState(['cities', 'selectedCities']),
	},
	methods: {
		addCity(e) {
      this.$store.dispatch('addCity', this.city);
		},
	},
	mounted() {
		this.$store.dispatch('load');
		this.$store.dispatch('loadSelected');
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only http://prntscr.com/kb86a9 -->
<style scoped>
.city-list {
	display: flex;
	flex-wrap: wrap;
	border: 1px solid red;
	justify-content: space-between;
}
.select-city {
	width: 400px;
	margin: 20px auto;
}
</style>
