<template>
  <div id="app">
    <transition name="slide-page">
      <div class="widget" v-if="widgetIsOpen">
        <router-view/>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="widget-open" v-if="!widgetIsOpen">
        <div class="widget-open__link" @click="openWidget">
          Book Now!
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BookingApp',

  data() {
    return {
      widgetIsOpen: false,
    };
  },

  methods: {
    openWidget() {
      this.widgetIsOpen = true;
    },
  },
};
</script>
