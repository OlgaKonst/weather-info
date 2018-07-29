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
    cityId: null,
  },
  mutations: {
    loadCities(state, cities) {
      state.cities = cities.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());
    },
    loadSelectedCities(state, cities) {
      state.selectedCities = cities;
    },
    addSelectedCity(state, city) {
      state.selectedCities.unshift(city);
    },
    removeCity(state, id) {
      state.selectedCities = state.selectedCities.filter(item => item.id !== id);
    },
    saveSelectedId(state, id) {
      state.cityId = id;
    },
  },
  actions: {
    load({ commit }) {
      const data = getCities();
      commit('loadCities', data);
    },
    async loadSelected({ commit }) {
      let cities = [];
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
      commit('loadSelectedCities', cities);
    },
    addCity({ state, commit }, id) {
      const idx = state.selectedCities.find((item) => item.id === id);
      if (idx === undefined) {
        const city = state.cities.find((item) => item.id === id);
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
