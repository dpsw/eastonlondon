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
    is_only_catalog_employees: 'false',
    guests: [
      {
        id: data.user.id,
        items: [
          {
            item: {
              id: data.booking.service.id,
            },
            therapist: {
              id: data.booking.master.id,
            },
          },
        ],
      },
    ],
  };

  return axios.post(queryUrl, requestData, {
    headers: { Authorization: `bearer ${data.token}` },
  });
};

export const confirm = (data) => {
  const apiUri = URLS.CONFIRM_BOOKING(data.booking.id);
  const queryUrl = `${URLS.API_URL}${apiUri}`;

  const requestData = {
    notes: 'Online booking',
  };

  return axios.post(queryUrl, requestData, {
    headers: { Authorization: `bearer ${data.token}` },
  });
};

export const cancel = (data) => {
  const apiUri = URLS.CANCEL_BOOKING(data.invoiceId);
  const queryUrl = `${URLS.API_URL}${apiUri}`;
  return axios.put(queryUrl, {
    headers: { Authorization: `bearer ${data.token}` },
  });
};
