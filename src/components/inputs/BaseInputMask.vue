<template>
    <div class="input-block">
        <div class="input">
            <input
                    type="text"
                    class="input__field"
                    maxlength="20"
                    v-mask="value.mask"
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
  },
};
</script>
