import * as serviceMutations from './mutations';

const serviceState = {
  widgetIsOpen: '',
  showLoading: true,
  token: 'AN:eastonlondon|CYDmZgDBdJMqop8pgEbSl76kIrbdtRHmLtWzBSS4suorvxWGMljcp_g2DzSUWlWa9OR2dQHTSZc4WK0lNuU03_E7393AqUPPi8Bnhsq7SFRBLx4nbxFabjHmb6NMA1znrVCxRyM70H5nHyrNN2cAOf6L-XulWj9OOfIPMQubvM18mN9boZgt_bSMVp-X_DaMDVLupR3zNFCifpGqNLCA3wRzCJaa8us-1UIKtPnVNgYktXQXeu69q3xVhsUB1AdiPxGszqC3Q8pJBfyOVpc4CT5vPmTjFS3FY7vfoozl9R7AceWU0kIiwfNJtFMVZtSgMuskKWZyE5zeUTivYdNBYcbQPTE-Ot8d1D61MejA2VG-sYvllj8JXYMNIyxFi5mejkI_JQdIt4rLing72mJQ9zQH1SYHChbSgPkwONBT-tJWcmiUYDdXpAerOBH-7n6R42-IcttVPP8OiJPNRE9Z9YIeuOACIAVvXYglQx_-xUkcHrRojfEbFSKPBQK7gSapHR3Io1RFPqLmvwiKZpeFwLe-rVcI1z_NkPH-qHXwaY8MgpTz1ZdL3sLixaieBgeXuw-o3rgHva5Iac7dk4hQuzWDlD3YCvWZC9NA0VuN8k6yundT3ksNur2cAy0c1TEGMAQyf2APGCpBKUPrPR_UXkt7L0fFD0rvS8nMi6KWLOBv9nUqCHw0Y76-TEKcwVqjkXtdNEZT3KsYXnMYQFs8xEqnklAIYle7bqjhTpGWYuZVaRe9yn_MD_f_wMx_pi8x',
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
