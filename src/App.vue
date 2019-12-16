<template>
  <div id="app">
    <transition name="slide-page">
      <div class="widget" v-if="widgetIsOpen">
        <div class="widget__container">
          <base-loader v-if="showLoading"></base-loader>
          <router-view/>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="widget-open" v-if="!widgetIsOpen">
        <div class="widget-open__link" @click="clickOpenWidgetButton">
          Book Now!
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BaseLoader from '@/components/BaseLoader.vue';
import ServiceStateMixin from '@/mixins/ServiceStateMixin';

export default {
  name: 'BookingApp',

  components: {
    BaseLoader,
  },

  mixins: [ServiceStateMixin],

  created() {
    // hide page loading if it is showing
    this.setShowLoading(false);
    // show widget if user try set a new password
    const isOpenWindow = window.location.href.includes('set-new-password');
    if (isOpenWindow) {
      this.openWidget();
    } else {
      this.closeWidget();
    }
  },

  methods: {
    clickOpenWidgetButton() {
      this.openWidget();
    },
  },
};
</script>
