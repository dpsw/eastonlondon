import axios from 'axios';
import * as URLS from '@/config/urls';

export const getAvailableTime = (data) => {
  const apiUri = URLS.GET_TIME_FOR_BOOKING(data.booking.id);
  const queryUrl = `${URLS.API_URL}${apiUri}`;

  return axios.get(queryUrl, {
    headers: { Authorization: `bearer ${data.token}` },
  });
};

export const reserveTime = (data) => {
  const apiUri = URLS.RESERVE_TIME_FOR_BOOKING(data.booking.id);
  const queryUrl = `${URLS.API_URL}${apiUri}`;

  const requestData = {
    slot_time: data.booking.time.id,
  };

  return axios.post(queryUrl, requestData, {
    headers: {
      Authorization: `bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
};
