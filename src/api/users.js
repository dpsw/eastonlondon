import axios from 'axios';
import * as URLS from '@/config/urls';

export const registration = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.REGISTRATION}`;

  const requestData = {
    email: data.user.email,
    password: data.password,
  };

  return axios.post(queryUrl, requestData);
};

export const login = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.LOGIN}`;

  const requestData = {
    email: data.user.email,
    password: data.password,
  };

  return axios.post(queryUrl, requestData);
};
