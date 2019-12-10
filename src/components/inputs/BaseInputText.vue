<template>
    <div class="input-block">
        <div class="input">
            <input
                    :type="localInputType"
                    class="input__field"
                    :class="{'input__field_error': hasError}"
                    maxlength="75"
                    :value="value.value"
                    :placeholder="value.placeholder"
                    @input="$emit('input', $event.target.value)"
            />

            <div class="input__icon" v-if="showIcon">
                <show-password
                    class="input__svg-selectable"
                    :class="isColoredSvg ? 'input__svg-colored' : ''"
                    @click="toggleShowingPassword"
                    v-if="showPasswordSvg">
                </show-password>
            </div>
        </div>
    </div>
</template>

<script>
import InputModel from '@/models/InputModel';
import ShowPassword from '@/assets/show-password.svg';

export default {
  name: 'BaseInputText',

  components: {
    ShowPassword,
  },

  props: {
    value: {
      type: InputModel,
    },
    inputType: {
      type: String,
      enum: ['email', 'text', 'password'],
      required: false,
      default: 'text',
    },
  },

  data() {
    return {
      localInputType: 'text',
    };
  },

  computed: {
    showPasswordSvg() {
      return this.inputType === 'password';
    },
    showIcon() {
      return this.showPasswordSvg;
    },
    isColoredSvg() {
      return this.inputType === 'password' && this.localInputType === 'text';
    },

    hasError() {
      return this.value.errorMessage.length > 0;
    },
  },

  created() {
    this.localInputType = this.inputType;
  },

  methods: {
    toggleShowingPassword() {
      this.localInputType = this.localInputType === 'password'
        ? 'text' : 'password';
    },
  },
};
</script>
