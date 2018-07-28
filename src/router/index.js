import Vue from 'vue';
import Router from 'vue-router';
import CardsList from '@/components/CadrsList';
import CityPage from '@/pages/CityPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CardsList',
      component: CardsList,
    },
    {
      path: '/city/:id',
      name: 'City',
      component: CityPage,
      props: true,
    },
  ],
});
