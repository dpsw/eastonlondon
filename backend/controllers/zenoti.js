const axios = require('axios');
const qs = require('querystring');
const urls = require('../config/urls');

const {
  ZENOTI_API_URL,
  ZENOTI_USER,
  ZENOTI_CLIENT_ID,
  ZENOTI_USER_PASSWORD,
  ZENOTI_API_KEY,
} = process.env;

const ZenotiAuthAPIInstance = axios.create({
  baseURL: ZENOTI_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    ApiKey: ZENOTI_API_KEY,
  },
});

let ZenotiAPIinstance = null;

let tokenData = null;

exports.generateToken = async () => ZenotiAuthAPIInstance.post(urls.GENERATE_TOKEN, qs.stringify({
  username: ZENOTI_USER,
  password: ZENOTI_USER_PASSWORD,
  grant_type: 'password',
  clientid: ZENOTI_CLIENT_ID,
}))
  .then((res) => {
    tokenData = res.data;
    ZenotiAPIinstance = axios.create({
      baseURL: ZENOTI_API_URL,
      timeout: 10000,
      headers: {
        authorization: `${tokenData.token_type} ${tokenData.access_token}`,
      },
    });
  })
  .catch((error) => {
    console.log('Generate Zenoti Token error: ', error);
    const err = error.response.data ? error.response.data : { error: 'Generate Zenoti Token error' };
    return err;
  });

this.generateToken();

// Regenerate token every 12 hours
setInterval(this.generateToken, 1000 * 60 * 60 * 12);

exports.getCenters = async (req, res) => ZenotiAPIinstance.get(urls.LIST_ALL_CENTERS)
  .then(
    data => res.status(201).json({
      centers: data.data && data.data.centers ? data.data.centers : [],
    }),
  )
  .catch((error) => {
    console.log('Generate Zenoti Centers error: ', error);
    return res.status(500).json({ error: { message: 'Internal server error.' } });
  });


exports.getCenterServices = async (req, res) => {
  const url = urls.LIST_SERVICES(req.query.center_id);
  ZenotiAPIinstance.get(url)
    .then(
      data => res.status(201).json({
        services: data.data && data.data.services ? data.data.services : [],
      }),
    )
    .catch((error) => {
      console.log('Generate Zenoti Services by center_id error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' } });
    });
};


exports.getCenterMasters = async (req, res) => {
  const url = urls.LIST_MASTERS(req.query.center_id);
  ZenotiAPIinstance.get(url)
    .then(
      data => res.status(201).json({
        masters: data.data && data.data.therapists ? data.data.therapists : [],
      }),
    )
    .catch((error) => {
      console.log('Generate Zenoti Masters by center_id error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' } });
    });
};


exports.saveGuest = async (req, res) => {
  ZenotiAPIinstance.post(urls.CREATE_GUEST, {
    center_id: req.body.center_id,
    personal_info: {
      first_name: 'Online',
      last_name: 'Booking',
      email: req.body.email,
      mobile_phone: {
        country_code: 44,
        number: req.body.phone,
      },
    },
  })
    .then(
      data => res.status(201).json({
        id: data.data && data.data.id ? data.data.id : [],
      }),
    )
    .catch((error) => {
      console.log('Save Zenoti guest error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' }, error });
    });
};


exports.saveBooking = async (req, res) => {
  const requestData = {
    center_id: req.body.center_id,
    date: req.body.date,
    is_only_catalog_employees: 'false',
    guests: [
      {
        id: req.body.guest_id,
        items: [],
      },
    ],
  };
  requestData.guests[0].items = req.body.services.map((s) => {
    if (req.body.master_id) {
      return {
        item: {
          id: s.id,
        },
        therapist: {
          id: req.body.master_id,
        },
      };
    }
    return {
      item: {
        id: s.id,
      },
    };
  });
  ZenotiAPIinstance.post(urls.CREATE_BOOKING, requestData)
    .then(
      data => res.status(201).json({
        id: data.data && data.data.id ? data.data.id : 0,
      }),
    )
    .catch((error) => {
      console.log('Create Zenoti booking error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' } });
    });
};


exports.confirmBooking = async (req, res) => {
  const requestData = {
    notes: 'Online booking',
  };

  const url = urls.CONFIRM_BOOKING(req.body.booking_id);
  ZenotiAPIinstance.post(url, requestData)
    .then(
      (data) => {
        if (data.data.error) {
          console.log('Confirm Zenoti booking error: ', data.data.error);
          return res.status(500).json({ error: { message: 'Internal server error.' } });
        }
        return res.status(201).json({
          id: data.data && data.data.id ? data.data.id : 0,
        });
      },
    )
    .catch((error) => {
      console.log('Create Zenoti booking error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' } });
    });
};


exports.cancelBooking = async (req, res) => {
  const url = urls.CANCEL_BOOKING(req.body.invoice_id);
  ZenotiAPIinstance.put(url)
    .then(
      (data) => {
        if (data.data.error) {
          console.log('Confirm Zenoti booking error: ', data.data.error);
          return res.status(500).json({ error: { message: 'Internal server error.' } });
        }
        return res.status(201).json({
          id: data.data && data.data.id ? data.data.id : 0,
        });
      },
    )
    .catch((error) => {
      console.log('Create Zenoti booking error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' } });
    });
};

exports.getAvailableTime = async (req, res) => {
  const url = urls.GET_TIME_FOR_BOOKING(req.query.booking_id);
  ZenotiAPIinstance.get(url)
    .then(
      data => res.status(201).json({
        slots: data.data && data.data.slots ? data.data.slots : [],
      }),
    )
    .catch((error) => {
      console.log('Get Zenoti available times by booking_id error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' } });
    });
};


exports.reserveTime = async (req, res) => {
  const requestData = {
    slot_time: req.body.time_id,
  };

  const url = urls.RESERVE_TIME_FOR_BOOKING(req.body.booking_id);
  ZenotiAPIinstance.post(url, requestData)
    .then(
      (data) => {
        if (data.data.error) {
          console.log('Reserve Zenoti time error: ', data.data.error);
          return res.status(500).json({ error: { message: 'Internal server error.' } });
        }
        return res.status(201).json({
          status: true,
        });
      },
    )
    .catch((error) => {
      console.log('Reserve Zenoti time error: ', error);
      return res.status(500).json({ error: { message: 'Internal server error.' } });
    });
};

exports.getBookingsByEmail = async (req, res) => {
  const requestData = {
    email: req.query.email,
  };

  try {
    const { data } = await ZenotiAPIinstance.get(urls.GET_GUESTS_BY_EMAIL, { params: requestData });
    if (!data.guests || data.guests.length === 0) {
      return res.status(201).json({ bookings: [] });
    }
    const guestIds = data.guests.map(g => g.id);
    let bookings = [];

    for (const guestId of guestIds) {
      const responseBookings = await ZenotiAPIinstance.get(urls.GET_BOOKINGS_BY_GUEST_ID(guestId));
      const dataBookings = responseBookings.data;
      if (!dataBookings.appointments || dataBookings.appointments.length === 0) {
        continue;
      }
      const booking = dataBookings.appointments.map(b => ({
        center_id: b.center_id,
        invoice_id: b.invoice_id,
        price: b.price.final,
        guest_id: guestId,
        services: b.appointment_services.map(s => ({
          invoice_item_id: s.invoice_item_id,
          service_id: s.service.id,
          start_time: s.start_time,
          therapist_id: s.requested_therapist_id,
        })),
      }));
      bookings = bookings.concat(booking);
    }

    return res.status(201).json({ bookings });
  } catch (error) {
    console.log('Get Zenoti Bookings by email: ', error);
    return res.status(500).json({ error: { message: 'Internal server error.' } });
  }
};
