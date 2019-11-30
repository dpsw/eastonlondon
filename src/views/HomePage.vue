<template>
  <div class="home">
    <app-header @back="goBack"></app-header>

    <app-body>

      <base-input-select v-model="locationsField"></base-input-select>
      <base-input-select v-model="servicesField"></base-input-select>
      <base-input-select v-model="masterField"></base-input-select>

      <base-input-date-select
              v-model="dateField"
              :is-less-margin="selectedDate !== 0"
      ></base-input-date-select>

      <transition name="slide-fade">
        <base-input-time-select
                v-if="selectedDate"
                v-model="timeField"></base-input-time-select>
      </transition>

       <base-input-text
               v-model="emailField"
               input-type="email"
       >
       </base-input-text>
       <base-input-mask v-model="phoneField"></base-input-mask>

       <base-input-checkbox v-model="agreeWithTermsField"></base-input-checkbox>

        <button class="button" @click="goNext">
            BOOK ME NOW!
        </button>
    </app-body>
  </div>
</template>

<script>
import BaseInputSelect from '@/components/inputs/BaseInputSelect.vue';
import BaseInputDateSelect from '@/components/inputs/BaseInputDateSelect.vue';
import BaseInputTimeSelect from '@/components/inputs/BaseInputTimeSelect.vue';
import BaseInputCheckbox from '@/components/inputs/BaseInputCheckbox.vue';
import BaseInputMask from '@/components/inputs/BaseInputMask.vue';
import BaseInputText from '@/components/inputs/BaseInputText.vue';
import InputModel from '@/models/InputModel';
import { PHONE_MASK } from '@/config/config';
import ServiceStateMixin from '@/mixins/ServiceStateMixin';

export default {
  name: 'HomePage',

  components: {
    BaseInputSelect,
    BaseInputDateSelect,
    BaseInputTimeSelect,
    BaseInputCheckbox,
    BaseInputMask,
    BaseInputText,
  },

  mixins: [ServiceStateMixin],

  data() {
    return {
      selectedLocation: 0,
      selectedServices: 0,
      selectedMaster: 0,
      selectedDate: 0,
      selectedTime: 0,
      email: '',
      phone: '',
      agreeWithTerms: true,

      locationList: [
        {
          label: 'Moorgate',
          id: 1,
        },
        {
          label: 'Paddington',
          id: 2,
        },
        {
          label: 'Waterloo',
          id: 3,
        },
      ],

      serviceList: [
        {
          label: 'Express Beard Trim - £15',
          id: 0,
        },
        {
          label: 'Clipper Cut - £20',
          id: 1,
        },
        {
          label: 'Haircut & Finish - £30',
          id: 2,
        },
        {
          label: 'Beard Design & Shave - £30',
          id: 3,
        },
        {
          label: 'Luxury Wet Shave - £30',
          id: 4,
        },
        {
          label: 'The Full Works - £55',
          id: 5,
        },
      ],

      masterList: [
        {
          label: 'Tom',
          id: 0,
        },
        {
          label: 'Joe',
          id: 1,
        },
      ],

      timeList: [
        {
          label: '16:00',
          id: 0,
        },
        {
          label: '17:35',
          id: 1,
        },
        {
          label: '18:10',
          id: 2,
        },
      ],

      dateStart: new Date(),

      phoneErrorMessage: '',
      emailErrorMessage: '',
    };
  },

  computed: {
    locationsField: {
      get() {
        const field = new InputModel(
          'At which location?',
          this.selectedLocation,
          '',
          'Choose a location',
        );
        field.setValues(this.locationList);
        return field;
      },
      set(value) {
        this.selectedLocation = value;
      },
    },

    servicesField: {
      get() {
        const field = new InputModel(
          'What do you need?',
          this.selectedServices,
          '',
          'Choose a service',
        );
        field.setValues(this.serviceList);
        return field;
      },
      set(value) {
        this.selectedServices = value;
      },
    },

    masterField: {
      get() {
        const field = new InputModel(
          'Want a specific barber?',
          this.selectedMaster,
          '',
          'Choose a barber',
        );
        field.setValues(this.masterList);
        return field;
      },
      set(value) {
        this.selectedMaster = value;
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
          this.selectedDate,
          '',
        );
        field.setValues(this.availableDates);
        return field;
      },
      set(value) {
        this.selectedDate = value;
      },
    },

    timeField: {
      get() {
        const field = new InputModel(
          '',
          this.selectedTime,
          '',
        );
        field.setValues(this.timeList);
        return field;
      },
      set(value) {
        this.selectedTime = value;
      },
    },

    agreeWithTermsField: {
      get() {
        const field = new InputModel(
          '',
          this.agreeWithTerms,
          '',
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
        const field = new InputModel(
          'Your email',
          this.email,
          this.emailErrorMessage,
        );
        return field;
      },
      set(value) {
        this.email = value;
      },
    },

    phoneField: {
      get() {
        const field = new InputModel(
          'Your phone no.',
          this.phone,
          this.phoneErrorMessage,
        );
        field.setMask(PHONE_MASK);
        return field;
      },
      set(value) {
        // this.phoneErrorMessage = value.length === PHONE_MASK.length
        //   ? '' : `Invalid phone code: ${PHONE_MASK}`;
        this.phone = value;
      },
    },
  },

  methods: {
    goNext() {
      this.$router.push('/success');
    },

    goBack() {
      this.closeWidget();
    },
  },
};
</script>
