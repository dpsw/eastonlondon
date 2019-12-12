import { mapActions, mapState } from 'vuex';
import UserModel from '@/models/UserModel';

export default {
  data() {
    return {
      user: new UserModel(),
    };
  },
  computed: {
    ...mapState({
      stateUser: state => state.user.user,
    }),
  },

  created() {
    this.user = UserModel.cloneUser(this.stateUser);
  },

  methods: {
    ...mapActions({
      setStateUser: 'user/setUser',
      saveStateUser: 'user/saveUser',
      login: 'user/login',
      registration: 'user/registration',
      setPasswordReset: 'user/setPasswordReset',
      resetPassword: 'user/resetPassword',
    }),
  },
};
