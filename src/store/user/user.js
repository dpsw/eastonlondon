
// import * as centersApi from '@/api/centers';
import Logger from '@/helpers/logger';
import UserModel from '@/models/UserModel';
import * as userMutations from './mutations';
import * as guestsApi from '@/api/guests';

const serviceState = {
  user: new UserModel(),
};

const actions = {
  setUser({ commit }, user) {
    commit(userMutations.SET_USER, user);
  },

  async saveUser({ commit, state, rootState }) {
    Logger.debug('saveUser', true);
    const response = await guestsApi.save({
      token: rootState.service.token,
      booking: rootState.booking.booking,
      user: state.user,
    });

    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }

    const newUser = UserModel.cloneUser(state.user);
    newUser.id = data.id;
    commit(userMutations.SET_USER, newUser);

    return newUser;
  },
};

const getters = {};

const mutations = {
  [userMutations.SET_USER](state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state: serviceState,
  getters,
  actions,
  mutations,
};
