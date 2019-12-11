import * as bookingsApi from '@/api/bookings';
import Logger from '@/helpers/logger';
// import ServiceModel from '@/models/ServiceModel';
import BookingModel from '@/models/BookingModel';
import UserModel from '@/models/UserModel';
import * as bookingMutations from './mutations';
import * as timesApi from '@/api/times';
import * as guestsApi from '@/api/guests';

const serviceState = {
  booking: new BookingModel(),
};

const actions = {
  setBooking({ commit }, booking) {
    commit(bookingMutations.SET_BOOKING, booking);
  },

  async saveBooking({
    state, rootState, commit, dispatch,
  }) {
    Logger.debug('saveBooking', true);

    if (!rootState.user.user.id) {
      await dispatch('user/saveUser', null, { root: true });
    }

    const response = await bookingsApi.save({
      booking: state.booking,
      user: rootState.user.user,
    });

    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
    const booking = BookingModel.cloneBooking(state.booking);
    booking.id = data.id;
    commit(bookingMutations.SET_BOOKING, booking);
    return booking;
  },

  async rescheduleBooking({
    dispatch, state,
  }) {
    Logger.debug('rescheduleBooking', true);

    await dispatch('cancelBooking', state.booking);
    await dispatch('saveBooking');
    await dispatch('reserveTime');
    await dispatch('confirmBooking');

    // const response = await bookingsApi.reschedule({
    //   booking: state.booking,
    //   user: rootState.user.user,
    // });
    //
    // const { data } = response;
    // if (data.error) {
    //   throw new Error(data.error.message);
    // }
  },

  async reserveTime({
    state,
  }) {
    Logger.debug('reserveTime', true);

    const response = await timesApi.reserveTime({
      booking: state.booking,
    });

    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
  },

  async confirmBooking({ state, rootState }) {
    Logger.debug('confirmBooking', true);

    const response = await bookingsApi.confirm({
      booking: state.booking,
      user: rootState.user.user,
    });

    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
  },

  async cancelBooking(state, booking) {
    Logger.debug('cancelBooking', true);

    const response = await bookingsApi.cancel({
      booking,
    });

    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
  },

  async createFakeBooking({ state }) {
    Logger.debug('createFakeBooking', true);

    const user = new UserModel();
    user.email = 'fake@online-booking.com';
    user.phone = '7777788888';

    const responseCreatingFakeUser = await guestsApi.save({
      booking: state.booking,
      user,
    });

    const dataCreatingFakeUser = responseCreatingFakeUser.data;
    if (dataCreatingFakeUser.error) {
      throw new Error(dataCreatingFakeUser.error.message);
    }
    user.id = dataCreatingFakeUser.id;

    const response = await bookingsApi.save({
      booking: state.booking,
      user,
    });

    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
    const booking = BookingModel.cloneBooking(state.booking);
    booking.id = data.id;
    return booking;
  },

  async getBookings({ rootState }) {
    Logger.debug('getBookings', true);
    const response = await bookingsApi.getBookings({
      user: rootState.user.user,
    });
    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
    if (!('bookings' in data)) return [];
    return data.bookings;
  },

  clearBooking({ commit }) {
    commit(bookingMutations.SET_BOOKING, new BookingModel());
  },
};

const getters = {};

const mutations = {
  [bookingMutations.SET_BOOKING](state, booking) {
    state.booking = booking;
  },
};

export default {
  namespaced: true,
  state: serviceState,
  getters,
  actions,
  mutations,
};
