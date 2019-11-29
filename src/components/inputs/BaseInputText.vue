<template>
    <div class="input-block">
        <div class="input">
            <input
                    :type="inputType"
                    class="input__field"
                    maxlength="75"
                    :value="value.value"
                    :placeholder="value.placeholder"
                    @input="$emit('input', $event.target.value)"
            />

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
  name: 'BaseInputText',

  components: {
    BaseError,
  },

  props: {
    value: {
      type: InputModel,
    },
    inputType: {
      type: String,
      enum: ['email', 'text'],
      required: false,
      default: 'text',
    },
  },
};
</script>
