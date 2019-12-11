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
  {
    path: '/registration',
    name: 'registration',
    component: () => import(/* webpackChunkName: "RegistrationPage" */ '../views/RegistrationPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "LoginPage" */ '../views/LoginPage.vue'),
  },
  {
    path: '/your-bookings',
    name: 'your-bookings',
    component: () => import(/* webpackChunkName: "YourBookingsPage" */ '../views/YourBookingsPage.vue'),
  },
  {
    path: '/reschedule',
    name: 'reschedule',
    component: () => import(/* webpackChunkName: "ReschedulePage" */ '../views/ReschedulePage.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
