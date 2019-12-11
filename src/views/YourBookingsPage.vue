<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>
        <div class="title title__with-margin">
            Your current bookings
        </div>

        <base-booking-list :booking-list="currentBookings"
                           @cancel="onCancelBooking" @reschedule="onRescheduleBooking">
        </base-booking-list>

        <button class="button" @click="goNext">Add Booking</button>
    </app-body>
  </div>
</template>

<script>
import BookingModel from '@/models/BookingModel';
import TimeModel from '@/models/TimeModel';
import BaseBookingList from '@/components/BaseBookingList.vue';
import ServiceStateMixin from '@/mixins/ServiceStateMixin';
import BookingStateMixin from '@/mixins/BookingStateMixin';
import CatalogStateMixin from '@/mixins/CatalogStateMixin';
import UserStateMixin from '@/mixins/UserStateMixin';

export default {
  name: 'YourBookingsPage',

  components: {
    BaseBookingList,
  },

  mixins: [ServiceStateMixin, CatalogStateMixin, BookingStateMixin, UserStateMixin],

  data() {
    return {

      centers: [],
      services: [],
      masters: [],

      currentBookings: [],
    };
  },

  async created() {
    this.setShowLoading(true);

    // Clear state booking
    this.clearBooking();

    this.centers = await this.getAllCenters();
    const rawBookings = await this.getBookings();

    const bookings = [];

    // eslint-disable-next-line
    for (const rawBooking of rawBookings) {
      const booking = new BookingModel();
      const center = this.centers.find(c => c.id === rawBooking.center_id);
      booking.center = center;

      let master = this.masters.find(m => m.id === rawBooking.services[0].therapist_id);
      if (!master) {
        // eslint-disable-next-line
        const mastersInCenter = await this.getCenterMasters(center);
        this.masters = this.masters.concat(mastersInCenter);
        master = this.masters.find(m => m.id === rawBooking.services[0].therapist_id);
      }
      booking.master = master;

      // eslint-disable-next-line
      this.services = await this.getCenterServices(center);

      // eslint-disable-next-line
      booking.service = rawBooking.services
        .map((s) => {
          const service = this.services.find(ls => ls.id === s.service_id);
          service.invoiceItemId = s.invoice_item_id;
          return service;
        });

      const time = rawBooking.services[0].start_time;
      const bookingDate = new Date(time);

      booking.date = bookingDate;
      booking.time = new TimeModel(time);

      booking.invoiceId = rawBooking.invoice_id;
      booking.guestId = rawBooking.guest_id;

      bookings.push(booking);

      if (!this.user.phone) {
        this.user.phone = rawBooking.phone;
        this.setStateUser(this.user);
      }
    }

    this.currentBookings = bookings;

    this.setShowLoading(false);
  },

  methods: {
    goNext() {
      this.$router.push('/');
    },
    goBack() {
      this.$router.push('/');
    },
    async onCancelBooking(booking) {
      this.setShowLoading(true);
      try {
        await this.cancelBooking(booking);
        this.currentBookings = this.currentBookings.filter(b => b.invoiceId !== booking.invoiceId);
      } catch (e) {
        console.log(e.message);
      }
      this.setShowLoading(false);
    },

    onRescheduleBooking(booking) {
      this.setStateBooking(booking);
      this.$router.push('/reschedule');
    },

  },
};
</script>
