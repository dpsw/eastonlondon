import axios from 'axios';
import * as URLS from '@/config/urls';

// { token, center, user}
export const save = (data) => {
  const queryUrl = `${URLS.API_URL}${URLS.CREATE_GUEST}`;

  const requestData = {
    center_id: data.booking.center.id,
    personal_info: {
      first_name: 'Online',
      last_name: 'Booking',
      email: data.user.email,
      mobile_phone: {
        country_code: 44,
        number: data.user.phone,
      },
    },
  };

  return axios.post(queryUrl, requestData, {
    headers: {
      Authorization: `bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  });
};
