import * as serviceMutations from './mutations';

const serviceState = {
  widgetIsOpen: '',
  showLoading: true,
};

const actions = {
  setShowLoading({ commit }, showLoading) {
    commit(serviceMutations.SET_SHOW_LOADING, showLoading);
  },
  openWidget({ commit }) {
    commit(serviceMutations.SET_WIDGET_IS_OPEN, true);
  },
  closeWidget({ commit }) {
    commit(serviceMutations.SET_WIDGET_IS_OPEN, false);
  },
};

const getters = {};

const mutations = {
  [serviceMutations.SET_SHOW_LOADING](state, showLoading) {
    state.showLoading = showLoading;
  },

  [serviceMutations.SET_WIDGET_IS_OPEN](state, widgetIsOpen) {
    state.widgetIsOpen = widgetIsOpen;
  },
};

export default {
  namespaced: true,
  state: serviceState,
  getters,
  actions,
  mutations,
};
