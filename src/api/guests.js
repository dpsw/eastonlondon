import axios from 'axios';
import * as URLS from '@/config/urls';

// { token, center, user}
export const save = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.CREATE_GUEST}`;

  const requestData = {
    center_id: data.booking.center.id,
    email: data.user.email,
    phone: data.user.phone,
  };

  return axios.post(queryUrl, requestData);
};
