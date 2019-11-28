<template>
    <div class="input-block">
        <div class="input">
            <label class="input__label">{{ value.label }}</label>

            <div class="input__dates">
                <div
                    class="input__date-item"
                    v-for="date in dates"
                    :key="formatDate(date)"
                    :class="isSelectedDate(date) ? 'input__date-item_selected':''"
                    @click="setSelected(date)"
                >
                    {{ formatDate(date) }}
                </div>
            </div>

            <base-error
                    v-if="value.errorMessage.length > 0"
                    :error="value.errorMessage"
            ></base-error>
        </div>
    </div>
</template>

<script>
import BaseError from './BaseError.vue';
import InputModel from '@/models/InputModel';

export default {
  name: 'BaseInputDateSelect',

  components: {
    BaseError,
  },

  props: {
    value: {
      type: InputModel,
    },
  },

  computed: {
    dates() {
      return this.value.values;
    },
  },

  methods: {
    setSelected(value) {
      this.$emit('input', value);
    },

    /**
     * Format date
     *
     * @param {Date} date
     * @return {String}
     */
    formatDate(date) {
      const options = { weekday: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-US', options).split(' ').reverse().join(' ');
    },

    /**
     * Compare two dates
     *
     * @param {Date} date
     * @return {Boolean}
     */
    isSelectedDate(date) {
      return this.formatDate(date) === this.formatDate(this.value.value);
    },
  },
};
</script>
