<template>
    <div class="booking-list__item"
         :class="{'booking-list__item_last': isLast}"
    >
      <div class="booking-list__info">
        {{ booking.formatBooking() }}
      </div>
      <div class="booking-list__actions">
        <div class="booking-list__change" @click="$emit('reschedule', booking)">
          Reschedule
        </div>
        <div class="booking-list__cancel" @click="$emit('cancel', booking)">
          Cancel booking
        </div>
      </div>
    </div>
</template>

<script>
import BookingModel from '@/models/BookingModel';

export default {
  name: 'BaseBookingList',

  props: {
    booking: {
      type: BookingModel,
      required: true,
    },

    isLast: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
