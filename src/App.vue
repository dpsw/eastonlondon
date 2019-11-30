<template>
  <div id="app">
    <transition name="slide-page">
      <div class="widget" v-if="widgetIsOpen">
        <router-view/>
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
import ServiceStateMixin from '@/mixins/ServiceStateMixin';

export default {
  name: 'BookingApp',

  mixins: [ServiceStateMixin],

  methods: {
    clickOpenWidgetButton() {
      this.openWidget();
    },
  },
};
</script>
