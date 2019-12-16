<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>

        <div class="title title__with-margin">
            Reset your password
        </div>

        <base-input-text
                v-model="passwordField"
                input-type="password"
                v-if="!success"
        >
        </base-input-text>

        <base-input-text
                v-model="passwordConfirmationField"
                input-type="password"
        >
        </base-input-text>

        <transition name="slide">
            <div class="error" v-if="error"> {{ error }} </div>
        </transition>

        <button class="button button_transparent" @click="reset">
            SET NEW PASSWORD
        </button>
        <button class="button" @click="goBack">
            GO TO LOGIN
        </button>
    </app-body>
  </div>
</template>

<script>
import BaseInputText from '@/components/inputs/BaseInputText.vue';
import InputModel from '@/models/InputModel';
import UserStateMixin from '@/mixins/UserStateMixin';
import ServiceStateMixin from '@/mixins/ServiceStateMixin';

export default {
  name: 'SetNewPasswordPage',

  components: {
    BaseInputText,
  },

  mixins: [ServiceStateMixin, UserStateMixin],

  data() {
    return {
      password: '',
      passwordErrorMessage: '',
      passwordConfirmation: '',
      passwordConfirmationErrorMessage: '',
      error: '',
      token: '',
    };
  },

  computed: {
    passwordField: {
      get() {
        return new InputModel(
          'Password',
          this.password,
          this.passwordErrorMessage,
        );
      },
      set(value) {
        this.password = value;
      },
    },
    passwordConfirmationField: {
      get() {
        return new InputModel(
          'Password Confirmation',
          this.passwordConfirmation,
          this.passwordConfirmationErrorMessage,
        );
      },
      set(value) {
        this.passwordConfirmation = value;
      },
    },

  },

  created() {
    this.user.email = this.$route.query.email;
    this.token = this.$route.query.token;
  },

  methods: {
    goBack() {
      this.$router.push('/login');
    },

    async reset() {
      this.passwordErrorMessage = this.password.length && this.password.length >= 6
        ? '' : 'Invalid password. Minimum length 6 symbols';
      this.passwordConfirmationErrorMessage = this.passwordConfirmation.length
        && this.password === this.passwordConfirmation
        ? '' : 'Confirm your password';

      if (this.passwordErrorMessage || this.passwordConfirmationErrorMessage) {
        this.error = 'Please fill out all required fields!';
        return;
      }

      this.setShowLoading(true);

      this.setStateUser(this.user);
      try {
        await this.resetPassword({ password: this.password, token: this.token });
        this.$router.push('/login');
      } catch (e) {
        console.log(e.message);
        this.error = e.message;
      }
      this.setShowLoading(false);
    },
  },
};
</script>
