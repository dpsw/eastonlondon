<template>
    <div class="input-block">
        <div class="input"
             v-for="(times, index) in timesByFourElements"
             :key="`times-block-${index}`"
             :class="isNotLastBlock(index) ? '' : 'input_less-margin' "
        >

            <div class="input__times">
                <div
                    class="input__time-item"
                    v-for="time in times"
                    :key="formatTime(time)"
                    :class="isSelectedTime(time) ? 'input__time-item_selected':''"
                    @click="setSelected(time)"
                >
                    {{ formatTime(time) }}
                </div>
                <!-- eslint-disable-next-line -->
                <div v-if="index === (timesByFourElements.length - 1)"
                     v-for="n in countHiddenBlocks"
                     :key="`hidden-time-${n}`"
                     class="input__time-item input__time-item_hidden"> 11:30 </div>
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
import TimeModel from '@/models/TimeModel';
import { chunk } from '@/helpers/array';

export default {
  name: 'BaseInputTimeSelect',

  components: {
    BaseError,
  },

  data() {
    return {
      countTimesInOneRow: 4,
    };
  },

  props: {
    value: {
      type: InputModel,
    },
  },

  computed: {
    timesByFourElements() {
      return chunk(this.value.values, this.countTimesInOneRow);
    },
    countHiddenBlocks() {
      if (this.timesByFourElements.length === 0) {
        return 0;
      }
      const countElementsInLastChunk = this.timesByFourElements[
        this.timesByFourElements.length - 1
      ].length;
      return this.countTimesInOneRow - countElementsInLastChunk;
    },
  },

  methods: {
    setSelected(value) {
      this.$emit('input', value);
    },

    /**
     * Format time
     *
     * @param {TimeModel} time
     * @return {String}
     */
    formatTime(time) {
      return time instanceof TimeModel ? time.getTime() : '';
    },

    /**
     * Compare two times
     *
     * @param {String} time
     * @return {Boolean}
     */
    isSelectedTime(time) {
      return this.formatTime(time) === this.formatTime(this.value.value);
    },

    /**
     * Check if current block is last
     *
     * @param {String} index
     * @return {Boolean}
     */
    isNotLastBlock(index) {
      return index >= this.timesByFourElements.length - 1;
    },
  },
};
</script>
