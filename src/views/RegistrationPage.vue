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

        <transition name="slide">
            <div class="error" v-if="error"> {{ error }} </div>
        </transition>

        <button class="button" @click="goNext">
            REGISTER
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
  name: 'RegistrationPage',

  components: {
    BaseInputText,
  },

  mixins: [ServiceStateMixin, UserStateMixin],

  data() {
    return {
      password: '',
      emailErrorMessage: '',
      passwordErrorMessage: '',
      error: '',
    };
  },

  computed: {
    emailField: {
      get() {
        return new InputModel(
          'Email',
          this.user.email,
          this.emailErrorMessage,
        );
      },
      set(value) {
        this.user.email = value;
      },
    },

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
  },

  created() {
    if (this.user.isLoggedIn) {
      this.$router.push('/your-bookings');
    }
  },

  methods: {
    async goNext() {
      this.emailErrorMessage = this.user.isValidEmail ? '' : 'Invalid email address';
      this.passwordErrorMessage = this.password.length >= 6 ? '' : 'Invalid password. Minimum length 6 symbols';

      if (this.emailErrorMessage) {
        this.error = 'Invalid email address';
        return;
      }
      if (this.passwordErrorMessage) {
        this.error = 'Invalid password. Minimum length 6 symbols';
        return;
      }

      this.setShowLoading(true);

      this.setStateUser(this.user);
      try {
        await this.registration(this.password);
        this.$router.push('/your-bookings');
      } catch (e) {
        console.log(e.message);
        this.error = e.message;
      }
      this.setShowLoading(false);
    },

    goBack() {
      this.$router.push('/');
    },
  },
};
</script>
