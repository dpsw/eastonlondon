import axios from 'axios';
import * as URLS from '@/config/urls';

export const save = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.CREATE_BOOKING}`;

  // example: 2019-07-24
  const dateForApi = new Date(data.booking.date)
    .toLocaleString('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');

  const requestData = {
    center_id: data.booking.center.id,
    date: dateForApi,
    guest_id: data.user.id,
  };
  if (data.booking.master && data.booking.master.id) {
    requestData.master_id = data.booking.master.id;
  }
  requestData.services = data.booking.service.map(s => ({ id: s.id }));

  return axios.post(queryUrl, requestData);
};

export const confirm = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.CONFIRM_BOOKING}`;

  const requestData = {
    booking_id: data.booking.id,
  };

  return axios.post(queryUrl, requestData);
};

export const cancel = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.CANCEL_BOOKING}`;
  const requestData = {
    invoice_id: data.invoiceId,
  };
  return axios.post(queryUrl, requestData);
};

export const getBookings = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.GET_BOOKINGS}`;

  const requestData = {
    email: data.user.email,
  };

  return axios.get(queryUrl, { params: requestData });
};
