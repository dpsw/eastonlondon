import Vue from 'vue';
import Vuex from 'vuex';
import service from '@/store/service/service';
import catalog from '@/store/catalog/catalog';
import user from '@/store/user/user';
import booking from '@/store/booking/booking';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    service,
    catalog,
    user,
    booking,
  },
});
