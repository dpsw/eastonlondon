import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      getAllCenters: 'catalog/getAllCenters',
      getCenterServices: 'catalog/getCenterServices',
      getCenterMasters: 'catalog/getCenterMasters',
      getTimeForCurrentBooking: 'catalog/getTimeForCurrentBooking',
      getTimeForBooking: 'catalog/getTimeForBooking',
    }),
  },
};
