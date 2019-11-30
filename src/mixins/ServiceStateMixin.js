import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      widgetIsOpen: state => state.service.widgetIsOpen,
      showLoading: state => state.service.showLoading,
    }),
  },
  methods: {
    ...mapActions({
      setShowLoading: 'service/setShowLoading',
      openWidget: 'service/openWidget',
      closeWidget: 'service/closeWidget',
    }),
  },
};
