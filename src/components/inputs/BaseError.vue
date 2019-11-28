<template>
    <div class="input__error"> {{ error }}</div>
</template>

<script>
export default {
  name: 'BaseError',
  props: {
    error: {
      type: String,
      required: true,
    },
  },
};
</script>
