<template>
    <div class="input-block">
        <div class="input">
            <label class="input__label">{{ value.label }}</label>
            <v-select
                    multiple
                    :clearable="true"
                    :searchable="false"
                    :placeholder="placeholder"
                    :options="options"
                    :value="valueData"
                    @input="setSelected"
            ></v-select>

            <base-error
                    v-if="value.errorMessage.length > 0"
                    :error="value.errorMessage"
            ></base-error>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select';
import BaseError from './BaseError.vue';
import InputModel from '@/models/InputModel';

export default {
  name: 'BaseInputMultipleSelect',

  components: {
    BaseError,
    vSelect,
  },

  props: {
    value: {
      type: InputModel,
    },
  },

  computed: {
    placeholder() {
      return this.value.placeholder ? this.value.placeholder : '';
    },
    options() {
      return this.value.values;
    },
    valueData() {
      return 'value' in this.value ? this.value.value : '';
    },
  },

  methods: {
    setSelected(value) {
      this.$emit('input', value);
    },
  },
};
</script>
