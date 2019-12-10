<template>
    <div class="input-block">
        <div class="input">
            <input
                    type="text"
                    class="input__field"
                    :class="{'input__field_error': hasError}"
                    maxlength="20"
                    v-mask="value.mask"
                    :value="value.value"
                    :placeholder="value.placeholder"
                    @input="$emit('input', $event.target.value)"
            />
        </div>
    </div>
</template>

<script>
import InputModel from '@/models/InputModel';

export default {
  name: 'BaseInputText',

  props: {
    value: {
      type: InputModel,
    },
  },

  computed: {
    hasError() {
      return this.value.errorMessage.length > 0;
    },
  },
};
</script>
