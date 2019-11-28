<template>
    <div class="input-block">
        <div class="input">

            <div class="input__times">
                <div
                    class="input__time-item"
                    v-for="time in times"
                    :key="formatTime(time)"
                    :class="isSelected(time) ? 'input__time-item_selected':''"
                    @click="setSelected(time)"
                >
                    {{ formatTime(time) }}
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
  name: 'BaseInputTimeSelect',

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
     * Format time
     *
     * @param {String} time
     * @return {String}
     */
    formatTime(time) {
      return time;
    },

    /**
     * Compare two times
     *
     * @param {String} time
     * @return {Boolean}
     */
    isSelectedDate(time) {
      return this.formatDate(time) === this.formatDate(this.value.value);
    },
  },
};
</script>
