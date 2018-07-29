import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { getCities, getSelectedCities } from '../api';

Vue.use(Vuex);
const store = new Vuex.Store({
  plugins: [createLogger()],
  state: {
    cities: [],
    selectedCities: [],
    selectedCard: {},
  },
  mutations: {
    loadCities(state, cities) {
      state.cities = cities;
    },
    loadSelectedCities(state, cities) {
      state.selectedCities = cities;
    },
    addSelectedCity(state, city) {
      state.selectedCities.push(city);
    },
    removeCity(state, id) {
      state.selectedCities = state.selectedCities.filter(item => item.id !== id);
    },
    selectedCard(state, weather) {
      state.selectedCard = weather;
    },
  },
  actions: {
    load({ commit }) {
      const data = getCities();
      commit('loadCities', data);
    },
    async loadSelected({ commit }) {
      let cities = [];
      console.log(localStorage.getItem('cities'));
      if (localStorage.getItem('cities')) {
        try {
          cities = JSON.parse(localStorage.getItem('cities'));
        } catch (e) {
          localStorage.removeItem('cities');
          cities = await getSelectedCities();
        }
      } else {
        cities = await getSelectedCities();
      }
      console.log(cities);
      commit('loadSelectedCities', cities);
    },
    addCity({ state, commit }, id) {
      const ity = state.selectedCities.find(item => item.id === id);
      if (ity === undefined) {
        const city = state.cities.find(item => item.id === id);
        commit('addSelectedCity', city);
      }
    },
    saveSelectedCities({ state }) {
      const parsed = JSON.stringify(state.selectedCities);
      localStorage.setItem('cities', parsed);
    },
  },
});

export default store;
