<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>

        <div class="title title__with-margin">
            Complete your registration
        </div>

       <base-input-text
               v-model="emailField"
               input-type="email"
       >
       </base-input-text>


        <base-input-text
                v-model="passwordField"
                input-type="password"
        >
        </base-input-text>

        <button class="button" @click="goNext">
            REGISTER
        </button>
    </app-body>
  </div>
</template>

<script>
import BaseInputText from '@/components/inputs/BaseInputText.vue';
import InputModel from '@/models/InputModel';

export default {
  name: 'RegistrationPage',

  components: {
    BaseInputText,
  },

  data() {
    return {
      email: '',
      password: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
    };
  },

  computed: {
    emailField: {
      get() {
        const field = new InputModel(
          'Email',
          this.email,
          this.emailErrorMessage,
        );
        return field;
      },
      set(value) {
        this.email = value;
      },
    },

    passwordField: {
      get() {
        const field = new InputModel(
          'Password',
          this.password,
          this.passwordErrorMessage,
        );
        return field;
      },
      set(value) {
        this.password = value;
      },
    },
  },

  methods: {
    goNext() {
      this.$router.push('/current-booking');
    },

    goBack() {
      this.$router.push('/');
    },
  },
};
</script>
