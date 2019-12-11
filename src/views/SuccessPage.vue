<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>
        <div class="title">
            Your grooming awaits!
        </div>

        <div class="text">
            Your booking was successful!
            A confirmation email with the booking details was sent to your inbox.
        </div>

        <div class="title"
             :class="{'title_link': user.isLoggedIn}"
             @click="reschedule">
            EASILY RESCHEDULE A BOOKING!
        </div>

        <button class="button" @click="goNext" v-if="!user.isLoggedIn">REGISTER NOW!</button>
    </app-body>
  </div>
</template>

<script>
import BookingStateMixin from '@/mixins/BookingStateMixin';
import UserStateMixin from '@/mixins/UserStateMixin';

export default {
  name: 'SuccessPage',

  mixins: [BookingStateMixin, UserStateMixin],

  created() {
    this.clearBooking();
    this.user.id = '';
    this.setStateUser(this.user);
  },

  methods: {
    goNext() {
      this.$router.push('/registration');
    },
    goBack() {
      this.$router.push('/');
    },
    reschedule() {
      if (this.user.isLoggedIn) {
        this.$router.push('/your-bookings');
      }
    },
  },
};
</script>
