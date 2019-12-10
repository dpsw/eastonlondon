import axios from 'axios';
import * as URLS from '@/config/urls';

export const getAllCenters = () => {
  const queryUrl = `${URLS.API_URL}${URLS.LIST_ALL_CENTERS}`;
  return axios.get(queryUrl);
};

export const getCenterMasters = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.LIST_MASTERS}`;
  return axios.get(queryUrl, {
    params: {
      center_id: data.centerId,
    },
  });
};

export const getCenterServices = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.LIST_SERVICES}`;
  return axios.get(queryUrl, {
    params: {
      center_id: data.centerId,
    },
  });
};
