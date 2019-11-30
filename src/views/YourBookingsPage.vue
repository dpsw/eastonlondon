<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>
        <div class="title title__with-margin">
            Your current bookings
        </div>

        <base-booking-list :booking-list="currentBookings">
        </base-booking-list>

        <button class="button" @click="goNext">Add Booking</button>
    </app-body>
  </div>
</template>

<script>
import BookingMode from '@/models/BookingModel';
import BaseBookingList from '@/components/BaseBookingList.vue';

export default {
  name: 'YourBookingsPage',

  components: {
    BaseBookingList,
  },

  data() {
    return {
      currentBookings: [
        new BookingMode(
          1,
          'Moorgate',
          'Luxury Wet Shave - £30',
          'Joe',
          new Date(),
          '16:00',
        ),
        new BookingMode(
          2,
          'Paddington',
          'The Full Works - £55',
          'Top',
          new Date(),
          '18:30',
        ),
      ],
    };
  },

  methods: {
    goNext() {
      this.$router.push('/');
    },
    goBack() {
      this.$router.push('/');
    },

  },
};
</script>
