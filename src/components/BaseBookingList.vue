<template>
  <div class="booking-list">
    <base-booking-list-item
            v-for="(booking, index) in bookingList"
            :key="`booking-${booking.id}`"
            :booking="booking"
            :is-last="index === bookingList.length - 1"
    >
    </base-booking-list-item>
  </div>
</template>

<script>
import BaseBookingListItem from '@/components/BaseBookingListItem.vue';

export default {
  name: 'BaseBookingList',

  components: {
    BaseBookingListItem,
  },

  props: {
    bookingList: Array,
  },
};
</script>
