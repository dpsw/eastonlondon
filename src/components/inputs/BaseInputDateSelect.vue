<template>
    <div class="input-block">
        <div class="input"
             :class="isLessMargin ? 'input_less-margin' : ''"
        >
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
        </div>
    </div>
</template>

<script>
import InputModel from '@/models/InputModel';
import * as dateHelper from '@/helpers/date';

export default {
  name: 'BaseInputDateSelect',


  props: {
    value: {
      type: InputModel,
    },
    isLessMargin: {
      type: Boolean,
    },
  },

  computed: {
    dates() {
      return this.value.values;
    },

    hasError() {
      return this.value.errorMessage.length > 0;
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
      return dateHelper.formatDate(date);
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
