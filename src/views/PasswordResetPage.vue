<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>

        <div class="title title__with-margin">
            Reset your password
        </div>

       <base-input-text
               v-if="!success"
               v-model="emailField"
               input-type="email"
       >
       </base-input-text>

        <transition name="slide">
            <div class="success" v-if="success"> {{ success }} </div>
        </transition>

        <transition name="slide">
            <div class="error" v-if="error"> {{ error }} </div>
        </transition>

        <button class="button button_transparent" @click="reset" v-if="!success">
            RESET
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
  name: 'PasswordResetPage',

  components: {
    BaseInputText,
  },

  mixins: [ServiceStateMixin, UserStateMixin],

  data() {
    return {
      emailErrorMessage: '',
      error: '',
      success: '',
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

  },

  created() {
    if (this.user.isLoggedIn) {
      this.$router.push('/your-bookings');
    }
  },

  methods: {
    goBack() {
      this.$router.push('/login');
    },
    async reset() {
      this.emailErrorMessage = this.user.isValidEmail ? '' : 'Invalid email address';

      if (this.emailErrorMessage) {
        this.error = 'Invalid email address';
        return;
      }

      this.setShowLoading(true);

      this.setStateUser(this.user);
      try {
        await this.setPasswordReset();
        this.success = 'We have e-mailed your password reset link!';
      } catch (e) {
        console.log(e.message);
        this.error = e.message;
      }
      this.setShowLoading(false);
    },
  },
};
</script>
