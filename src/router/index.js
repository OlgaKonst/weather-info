import Vue from 'vue';
import Router from 'vue-router';
import CardsList from '@/components/CardsList';
import CityInfo from '@/components/CityInfo';

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
      component: CityInfo,
      props: true,
    },
  ],
});
