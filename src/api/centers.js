import axios from 'axios';
import * as URLS from '@/config/urls';

export const getAllCenters = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.LIST_ALL_CENTERS}`;
  return axios.get(queryUrl, {
    headers: { Authorization: `bearer ${data.token}` },
  });
};

export const getCenterMasters = (data) => {
  const apiUri = URLS.LIST_MASTERS(data.centerId);
  const queryUrl = `${URLS.API_URL}${apiUri}`;
  return axios.get(queryUrl, {
    headers: { Authorization: `bearer ${data.token}` },
  });
};

export const getCenterServices = (data) => {
  const apiUri = URLS.LIST_SERVICES(data.centerId);
  const queryUrl = `${URLS.API_URL}${apiUri}`;
  return axios.get(queryUrl, {
    headers: { Authorization: `bearer ${data.token}` },
  });
};
