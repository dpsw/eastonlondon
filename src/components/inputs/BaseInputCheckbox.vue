<template>
    <div class="radio-block">
        <div class="radio-block__inputs">
            <label
                v-for="v in value.values"
                :for="generateId(v.id)"
                :key="generateId(v.id)"
                class="radio">

                <input type="checkbox"
                   class="radio__input"
                   v-model="localValue"
                   :value="v.id"
                   :id="generateId(v.id)"
                >
                <span class="radio__label"
                      :class="{'radio__label_error': hasError}">
                    {{ v.label }}
                </span>

            </label>
        </div>
    </div>
</template>

<script>
import InputModel from '@/models/InputModel';

export default {
  name: 'BaseInputCheckbox',

  props: {
    value: {
      type: InputModel,
    },
  },

  data() {
    return {
      localValue: [],
    };
  },

  computed: {
    propValue() {
      return this.value.value;
    },

    hasError() {
      return this.value.errorMessage.length > 0;
    },
  },

  watch: {
    propValue(newValue) {
      this.localValue = newValue;
    },

    localValue: {
      deep: true,
      handler(value) {
        this.$emit('input', value);
      },
    },
  },

  created() {
    this.localValue = this.value.value;
  },

  methods: {

    /**
     * Generate id for element
     *
     * @param {String} id
     * @return {String}
     */
    generateId(id) {
      return `checkbox-${id}`;
    },
  },

};
</script>
