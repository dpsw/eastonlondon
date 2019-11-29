import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/success',
    name: 'success',
    component: () => import(/* webpackChunkName: "SuccessPage" */ '../views/SuccessPage.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
