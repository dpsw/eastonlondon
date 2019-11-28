import './styles/styles.scss';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AppHeader from '@/components/AppHeader.vue';
import AppBody from '@/components/AppBody.vue';

Vue.config.productionTip = false;

Vue.component('app-header', AppHeader);
Vue.component('app-body', AppBody);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
