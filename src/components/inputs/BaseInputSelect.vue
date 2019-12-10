<template>
    <div class="input-block">
        <div class="input">
            <label class="input__label">{{ value.label }}</label>
            <v-select
                    :clearable="true"
                    :searchable="false"
                    :placeholder="placeholder"
                    :options="options"
                    :value="valueData"
                    :class="{'v-select_error': hasError}"
                    @input="setSelected"
            ></v-select>

        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select';
import InputModel from '@/models/InputModel';

export default {
  name: 'BaseInputSelect',

  components: {
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
    hasError() {
      return this.value.errorMessage.length > 0;
    },
  },

  methods: {
    setSelected(value) {
      this.$emit('input', value);
    },
  },
};
</script>
