<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>

      <base-input-select v-model="locationsField"></base-input-select>
      <base-input-multiple-select v-model="servicesField"></base-input-multiple-select>
      <base-input-select v-model="masterField"></base-input-select>

      <base-input-date-select
              v-model="dateField"
              :is-less-margin="availableTimes.length > 0"
      ></base-input-date-select>

      <transition name="slide">
        <base-input-time-select
                v-if="availableTimes.length > 0"
                v-model="timeField"></base-input-time-select>
      </transition>

       <base-input-text
               v-model="emailField"
               input-type="email"
       >
       </base-input-text>
       <base-input-mask v-model="phoneField"></base-input-mask>

       <base-input-checkbox v-model="agreeWithTermsField"></base-input-checkbox>

        <transition name="slide">
            <div class="error" v-if="error"> {{ error }} </div>
        </transition>

        <button class="button" @click="goNext">
            BOOK ME NOW!
        </button>
    </app-body>
  </div>
</template>

<script>
import BaseInputSelect from '@/components/inputs/BaseInputSelect.vue';
import BaseInputMultipleSelect from '@/components/inputs/BaseInputMultipleSelect.vue';
import BaseInputDateSelect from '@/components/inputs/BaseInputDateSelect.vue';
import BaseInputTimeSelect from '@/components/inputs/BaseInputTimeSelect.vue';
import BaseInputCheckbox from '@/components/inputs/BaseInputCheckbox.vue';
import BaseInputMask from '@/components/inputs/BaseInputMask.vue';
import BaseInputText from '@/components/inputs/BaseInputText.vue';
import InputModel from '@/models/InputModel';
import { PHONE_MASK } from '@/config/config';
import ServiceStateMixin from '@/mixins/ServiceStateMixin';
import CatalogStateMixin from '@/mixins/CatalogStateMixin';
import UserStateMixin from '@/mixins/UserStateMixin';
import BookingStateMixin from '@/mixins/BookingStateMixin';
import BookingModel from '@/models/BookingModel';
import UserModel from '@/models/UserModel';

export default {
  name: 'HomePage',

  components: {
    BaseInputSelect,
    BaseInputDateSelect,
    BaseInputTimeSelect,
    BaseInputCheckbox,
    BaseInputMask,
    BaseInputText,
    BaseInputMultipleSelect,
  },

  mixins: [CatalogStateMixin, ServiceStateMixin, UserStateMixin, BookingStateMixin],

  data() {
    return {
      agreeWithTerms: true,
      agreeWithTermsErrorMessage: true,

      centers: [],
      services: [],
      masters: [],

      availableTimes: [],

      dateStart: new Date(),

      centerErrorMessage: '',
      servicesErrorMessage: '',
      phoneErrorMessage: '',
      emailErrorMessage: '',

      error: '',
    };
  },

  computed: {
    selectedCenter() {
      if (!this.booking.center) { return null; }
      return this.centers.find(c => c.id === this.booking.center.id);
    },

    locationsField: {
      get() {
        const field = new InputModel(
          'At which location?',
          this.booking.center,
          this.centerErrorMessage,
          'Choose a location',
        );
        const locations = this.centers.map(c => ({
          id: c.id,
          label: c.name,
        }));
        field.setValues(locations);
        return field;
      },
      async set(value) {
        this.setShowLoading(true);

        // Detect changing location
        if (this.booking.center && this.booking.center.id && value) {
          if (this.booking.center.id !== value.id) {
            this.booking.service = null;
            this.booking.master = null;
            this.booking.date = null;
            this.booking.time = null;
            this.availableTimes = [];
          }
        }

        this.booking.center = value;
        await this.fetchMastersForCurrentLocation();
        await this.fetchServicesForCurrentLocation();

        this.setShowLoading(false);
      },
    },

    servicesField: {
      get() {
        const field = new InputModel(
          'What do you need?',
          this.booking.service,
          this.servicesErrorMessage,
          'Choose a service',
        );
        const services = this.services.map(s => ({
          id: s.id,
          label: s.getLabel(),
        }));
        field.setValues(services);
        return field;
      },
      set(value) {
        this.booking.service = value;
      },
    },

    masterField: {
      get() {
        const field = new InputModel(
          'Want a specific barber?',
          this.booking.master,
          '',
          'Choose a barber',
        );
        const masters = this.masters.map(m => ({
          id: m.id,
          label: m.name,
        }));
        field.setValues(masters);
        return field;
      },
      set(value) {
        this.booking.master = value;
      },
    },

    availableDates() {
      const daysInWeek = 7;
      const dates = [];
      const tmpDate = new Date(this.dateStart);
      dates.push(new Date(tmpDate));
      for (let i = 1; i < daysInWeek; i += 1) {
        tmpDate.setDate(tmpDate.getDate() + 1);
        dates.push(new Date(tmpDate));
      }
      return dates;
    },

    dateField: {
      get() {
        const field = new InputModel(
          'When are you coming in?',
          this.booking.date,
          '',
        );
        field.setValues(this.availableDates);
        return field;
      },
      async set(value) {
        this.booking.date = value;
        // Reset time selected
        this.booking.time = '';

        this.setShowLoading(true);

        await this.loadTime();

        this.setShowLoading(false);
      },
    },

    timeField: {
      get() {
        const field = new InputModel(
          '',
          this.booking.time,
          '',
        );
        const times = this.availableTimes.map(t => ({
          id: t.id,
          label: t.getTime(),
        }));

        field.setValues(times);
        return field;
      },
      set(value) {
        this.booking.time = value;
      },
    },

    agreeWithTermsField: {
      get() {
        const field = new InputModel(
          '',
          this.agreeWithTerms,
          this.agreeWithTermsErrorMessage,
        );
        field.setValues([{ id: 1, label: 'I agree to the Terms & Conditions' }]);
        return field;
      },
      set(value) {
        this.agreeWithTerms = value;
      },
    },

    emailField: {
      get() {
        return new InputModel(
          'Your email',
          this.user.email,
          this.emailErrorMessage,
        );
      },
      set(value) {
        this.user.email = value;
      },
    },

    phoneField: {
      get() {
        const field = new InputModel(
          'Your phone no.',
          this.user.phone,
          this.phoneErrorMessage,
        );
        field.setMask(PHONE_MASK);
        return field;
      },
      set(value) {
        this.user.phone = value;
      },
    },
  },

  async created() {
    this.setShowLoading(true);

    const centers = await this.getAllCenters();

    if (this.booking.isReadyForGettingAvailableTimes) {
      await this.fetchServicesForCurrentLocation();
      await this.fetchMastersForCurrentLocation();
      await this.loadTime();
    }

    this.centers = centers;

    this.setShowLoading(false);
  },

  methods: {
    async goNext() {
      this.emailErrorMessage = this.user.isValidEmail ? '' : 'Invalid email address';
      this.phoneErrorMessage = this.user.isValidPhone ? '' : 'Invalid phone';
      this.agreeWithTermsErrorMessage = this.agreeWithTerms ? '' : 'Required field';
      this.centerErrorMessage = this.booking.center && this.booking.center.id ? '' : 'Required field';
      this.servicesErrorMessage = this.booking.service && this.booking.service.length > 0 ? '' : 'Required field';

      if (!this.booking.isReadyForBookingCreating || !this.agreeWithTerms) {
        this.error = 'Please fill out all required fields!';
        if (!this.booking.date || !this.booking.time) {
          this.error = 'Please select date and time';
        }
        return;
      }

      try {
        // Update state data

        this.setShowLoading(true);

        this.setStateUser(this.user);
        this.setStateBooking(this.booking);

        await this.saveStateBooking();
        await this.reserveTime();
        await this.confirmStateBooking();

        this.setShowLoading(false);

        this.$router.push('/success');
      } catch (e) {
        this.error = e.message;
        this.setShowLoading(false);
      }
    },

    goBack() {
      this.closeWidget();
    },

    async fetchServicesForCurrentLocation() {
      this.services = await this.getCenterServices(this.booking.center);
    },

    async fetchMastersForCurrentLocation() {
      this.masters = await this.getCenterMasters(this.booking.center);
    },

    async loadTime() {
      if (!this.booking.isReadyForGettingAvailableTimes) {
        this.error = 'Please fill all fields';
        return;
      }

      this.error = '';

      if (!this.user.id && this.user.email && this.user.phone) {
        this.setStateUser(this.user);
        await this.saveStateUser();
        this.user = UserModel.cloneUser(this.stateUser);
      }

      this.setStateBooking(this.booking);

      let times = [];
      if (!this.user.id) {
        const fakeBooking = await this.createFakeBooking();
        times = await this.getTimeForBooking(fakeBooking);
      } else {
        await this.saveStateBooking();
        this.booking = BookingModel.cloneBooking(this.stateBooking);
        times = await this.getTimeForCurrentBooking();
      }

      if (times.length === 0) {
        this.error = 'There is no free time for the selected date';
      }

      this.availableTimes = times;
    },
  },
};
</script>
