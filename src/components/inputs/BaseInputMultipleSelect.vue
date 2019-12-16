<template>
    <div class="input-block">
        <div class="input">
            <label class="input__label">{{ value.label }}</label>


            <div dir="auto" class="v-select multiple-select vs--single vs--unsearchable"
                 :class="{'vs--open': isOpen, 'v-select_error': hasError}">
                <div class="vs__dropdown-toggle" @click="toggleOpeningList">
                    <div class="vs__selected-options">
                        <span class="vs__selected" v-if="inputText"> {{ inputText }} </span>
                        <input v-else
                               placeholder="Choose a service"
                               readonly="readonly"
                               aria-label="Search for option"
                               autocomplete="off" class="vs__search">
                    </div>
                    <div class="vs__actions">

                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="14" height="10" role="presentation" class="vs__open-indicator">
                            <!-- eslint-disable-next-line -->
                            <path d="M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z"></path>
                        </svg>
                    </div>
                </div>
                <ul role="listbox" class="vs__dropdown-menu" v-if="isOpen">
                    <li role="option" class="vs__dropdown-option"
                        v-for="option in options" :key="option.id"
                        :class="{'vs__dropdown-option--selected': isSelected(option)}"
                        @click="toggleOption(option)"
                    >
                        {{ option.label }}
                    </li>
                    <li v-if="options.length === 0" class="vs__no-options">
                        Sorry, no matching options.
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
import InputModel from '@/models/InputModel';

export default {
  name: 'BaseInputMultipleSelect',

  data() {
    return {
      isOpen: false,
    };
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
    inputText() {
      let text = '';

      if (this.valueData && this.valueData.length === 1) {
        const symbolLimit = 30;
        const { label } = this.valueData[0];
        text = label.length > symbolLimit ? `${label.substring(0, symbolLimit)}...` : label;
      } else if (this.valueData && this.valueData.length > 1) {
        text = `${this.valueData.length} services chosen`;
      }

      return text;
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
     * Check a option status
     * @param option
     * @returns {boolean}
     */
    isSelected(option) {
      if (!this.valueData) return false;
      const value = this.valueData.find(v => v.id === option.id);
      return !!value;
    },

    toggleOpeningList() {
      this.isOpen = !this.isOpen;
    },

    toggleOption(option) {
      if (!this.valueData) {
        this.value.value = [option];
        this.setSelected(this.value.value);
        return;
      }
      const value = this.valueData.find(v => v.id === option.id);

      if (value) {
        // Remove item from selected
        this.value.value = this.valueData.filter(v => v.id !== option.id);
      } else {
        this.value.value.push(option);
      }

      // if (this.value.value.length > 0) {
      //   this.isOpen = false;
      // }

      this.setSelected(this.value.value);
    },
  },
};
</script>
