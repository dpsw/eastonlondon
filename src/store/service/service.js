import * as serviceMutations from './mutations';

const serviceState = {
  widgetIsOpen: '',
  showLoading: true,
  token: 'AN:eastonlondon|c4lW8EHEIWv9CwYWRUzpLS6lXlL2wfIQB4nP63yY93_KTBvTWB7YdjW61mp0DE3brlkcAd4g9AlKDKesLUENB5Az8it7ErmB48xwseLPZVpYhpfzMji4j2-51Zi6_qcWKdJ2X0hGd6TRwH2TusfZb7Ga0Fuaxicl3YGBUm2ClyCx7sLu9EGW_D5HIimb1gx7hsMbGImO-0EprVYQYVJ_Ub3-9m4aBUebAtGneMt_3Ae8R_Z1eUG4cBlZF2l1YLiMz7LQT4qwi_eTk7JxoTn3DQdvYVA6lRH3Rp8PG7gJcGR1sm7R_taOXrkEIspI1UeAdmUpYNXuQ870TT94tJORWnBar6bN-rLIpzNAe6NaBTXvWXi2oWY7HKHIsSpltKOtQR64hsDkMvYwyw-e3CUfuDtXoB5SC-D5lr_OADI-7ofvmENBIHrX8dqsfIi5shN5tGYtDUc3HYlSDKP5sH8JDIMP65giagHw4EEdxVaoeE3PoxN0Mjz2L9nlz-Sbu4b9iZzMtXshJRRW4jAWZNORiyw5yx0F0XhE0QTdq1kj6BUuf25ke4R7nWGcLTc-f6St5UCm5TpsgxeaYWUAkKWm1WtB1DACmIpotVTlDsMQYTyCU0FvUrWElfXPdxhcYVqfZ4vkKzwgqibPMv1iIqOEQKKlo-72FJ6gxSM6XMxtyB2PHA10p7Zy6cAJkpBoHDQHcYQvxfEp60dpzoOkyU_8NHISlIwkURXSXo9iI80CrgY_i2axZxdULloOakrNrrcQ',
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
