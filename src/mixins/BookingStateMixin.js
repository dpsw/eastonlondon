import { mapActions, mapState } from 'vuex';
import BookingModel from '@/models/BookingModel';

export default {
  data() {
    return {
      booking: new BookingModel(),
    };
  },

  computed: {
    ...mapState({
      stateBooking: state => state.booking.booking,
    }),
  },

  created() {
    this.booking = BookingModel.cloneBooking(this.stateBooking);
  },

  methods: {
    ...mapActions({
      setStateBooking: 'booking/setBooking',
      saveStateBooking: 'booking/saveBooking',
      confirmStateBooking: 'booking/confirmBooking',
      reserveTime: 'booking/reserveTime',
      createFakeBooking: 'booking/createFakeBooking',
    }),
  },
};
