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

        <div class="title">
            EASILY RESCHEDULE A BOOKING!
        </div>

        <button class="button" @click="goNext">REGISTER NOW!</button>
    </app-body>
  </div>
</template>

<script>
export default {
  name: 'SuccessPage',

  methods: {
    goNext() {
      this.$router.push('/registration');
    },
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>
