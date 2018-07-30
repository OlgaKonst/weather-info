# weather-info

 The project implements a SPA, showing the weather in selected cities.

 * A list of cities is displayed. The city card displays a short information of the weather.
 * Clicking on the card displays more detailed information.
 * After adding a city detailed information about the current weather is displayed.
 * Data is stored locally. A list of available cities is stored in  list.json, a list of selected cities is stored    in selected-cities.json. When acity is added/deleted, the modified list of selected cities is stored in            localStorage.

The project uses Vue.js, Vuex, Vue-router.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
