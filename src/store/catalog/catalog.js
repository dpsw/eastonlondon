import * as centersApi from '@/api/centers';
import * as timesApi from '@/api/times';
import Logger from '@/helpers/logger';
import CenterModel from '@/models/CenterModel';
import ServiceModel from '@/models/ServiceModel';
import MasterModel from '@/models/MasterModel';
import BookingModel from '@/models/BookingModel';
import TimeModel from '@/models/TimeModel';

const serviceState = {
};

const actions = {
  async getAllCenters({ rootState }) {
    Logger.debug('getAllCenters', true);
    const response = await centersApi.getAllCenters({
      token: rootState.service.token,
    });
    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
    if (!('centers' in data)) return [];
    return data.centers.map(c => CenterModel.makeCenterFromServerObject(c));
  },

  async getCenterMasters({ rootState }, center) {
    Logger.debug('getCenterMasters', true);
    const response = await centersApi.getCenterMasters({
      token: rootState.service.token,
      centerId: center.id,
    });
    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
    if (!('therapists' in data)) return [];
    return data.therapists.map(m => MasterModel.makeMasterFromServerObject(m));
  },

  async getCenterServices({ rootState }, center) {
    Logger.debug('getCenterServices', true);
    const response = await centersApi.getCenterServices({
      token: rootState.service.token,
      centerId: center.id,
    });
    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }
    if (!('services' in data)) return [];
    return data.services.map(s => ServiceModel.makeServiceFromServerObject(s));
  },

  async getTimeForCurrentBooking({ dispatch, rootState }) {
    Logger.debug('getTimeForDate', true);
    const booking = BookingModel.cloneBooking(rootState.booking.booking);

    const slots = await dispatch('getTimeForBooking', booking);
    return slots;
  },

  async getTimeForBooking({ rootState }, booking) {
    Logger.debug('getTimeForDate', true);

    const response = await timesApi.getAvailableTime({
      token: rootState.service.token,
      booking,
    });
    const { data } = response;
    if (data.error) {
      throw new Error(data.error.message);
    }

    if (!('slots' in data)) return [];

    if (!data.slots) return [];

    return data.slots
      .filter(s => s.Available)
      .map(s => new TimeModel(s.Time))
      .filter(t => t.isCorrect());
  },

};

const getters = {};

const mutations = {
};

export default {
  namespaced: true,
  state: serviceState,
  getters,
  actions,
  mutations,
};
