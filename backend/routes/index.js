const ZenotiController = require('../controllers/zenoti');
const UserController = require('../controllers/users');

exports.initRoute = (app) => {
  app.get('/api/zenoti/centers', ZenotiController.getCenters);
  app.get('/api/zenoti/services', ZenotiController.getCenterServices);
  app.get('/api/zenoti/masters', ZenotiController.getCenterMasters);

  app.post('/api/zenoti/guest/store', ZenotiController.saveGuest);

  app.get('/api/zenoti/bookings', ZenotiController.getBookingsByEmail);
  app.post('/api/zenoti/booking/store', ZenotiController.saveBooking);
  app.post('/api/zenoti/booking/confirm', ZenotiController.confirmBooking);
  app.post('/api/zenoti/booking/cancel', ZenotiController.cancelBooking);
  app.post('/api/zenoti/booking/reschedule', ZenotiController.rescheduleBooking);

  app.get('/api/zenoti/times', ZenotiController.getAvailableTime);
  app.post('/api/zenoti/time/reserve', ZenotiController.reserveTime);


  app.post('/api/user/signUp', UserController.signUp);
  app.post('/api/user/signIn', UserController.signIn);
};
