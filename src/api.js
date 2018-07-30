/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint-disable */
import citiesList from './data/list.json';
import selectedCities from './data/selected-cities.json';

const HOST = 'http://api.openweathermap.org/data/2.5/forecast?id';
const key = '7f8d0fa8d3226d1b4eded55c785b46fb';

export default function getWeather(id) {
  return fetch(`${HOST}=${id}&APPID=${key}`).then((r) => {
    return r.json();
  });
}

export function getCities() {
  return [...citiesList];
}

export function getSelectedCities() {
  return [...selectedCities];
}