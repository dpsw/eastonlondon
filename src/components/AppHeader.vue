<template>
  <div class="app-header">
    <div class="app-header__link">
      <arrow-back></arrow-back>
    </div>
    <div class="app-header__logo">
      <img src="@/assets/easton-london-logo.png" alt="Easton London">
    </div>
    <div class="app-header__link">
      <account-svg></account-svg>
    </div>
  </div>
</template>

<script>
import AccountSvg from '@/assets/account.svg';
import ArrowBack from '@/assets/arrow-back.svg';

export default {
  name: 'AppHeader',

  components: {
    AccountSvg,
    ArrowBack,
  },

  props: {
    msg: String,
  },
};
</script>
