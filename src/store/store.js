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
      console.log('selectedCard', state.selectedCard);
    },
  },
  actions: {
    load({ commit }) {
      const data = getCities();
      commit('loadCities', data);
    },
    async loadSelected({ commit }) {
      const data = await getSelectedCities();
      console.log(data);
      commit('loadSelectedCities', data);
    },
    addCity({ state, commit }, id) {
      const ity = state.selectedCities.find(item => item.id === id);
      if (ity === undefined) {
        const city = state.cities.find(item => item.id === id);
        commit('addSelectedCity', city);
      }
    },
  },
});

export default store;
