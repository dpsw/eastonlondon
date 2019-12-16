export default {
  methods: {
    scrollToClass(className) {
      const container = document.querySelectorAll('#app .widget');
      if (!container.length) { return; }
      debugger;
      const elements = document.querySelectorAll(`#app .${className}`);
      if (elements.length) {
        container[0].scrollTo({
          top: elements[0].offsetTop,
          behavior: 'smooth',
        });
      }
    },
  },
};
