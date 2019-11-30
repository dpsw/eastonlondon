<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>

        <div class="title title__with-margin">
            LOGIN to your account
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

        <button class="button button_transparent" @click="goLogin">
            LOGIN
        </button>
        <button class="button" @click="goRegistration">
            REGISTRATION
        </button>
    </app-body>
  </div>
</template>

<script>
import BaseInputText from '@/components/inputs/BaseInputText.vue';
import InputModel from '@/models/InputModel';

export default {
  name: 'LoginPage',

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
    goRegistration() {
      this.$router.push('/registration');
    },
    goLogin() {

    },

    goBack() {
      this.$router.push('/');
    },
  },
};
</script>
