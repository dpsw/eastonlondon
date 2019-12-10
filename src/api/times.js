import axios from 'axios';
import * as URLS from '@/config/urls';

export const getAvailableTime = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.GET_TIME_FOR_BOOKING}`;

  return axios.get(queryUrl, {
    params: {
      booking_id: data.booking.id,
    },
  });
};

export const reserveTime = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.RESERVE_TIME_FOR_BOOKING}`;

  const requestData = {
    booking_id: data.booking.id,
    time_id: data.booking.time.id,
  };

  return axios.post(queryUrl, requestData);
};
