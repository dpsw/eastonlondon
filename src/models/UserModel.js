import { PHONE_MASK } from '@/config/config';

export default class UserModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   * @param {String} email
   * @param {String} phone
   * @param {Boolean} isLoggedIn
   */
  constructor(id = '', email = '', phone = '', isLoggedIn = false) {
    this.id = id;
    this.email = email;
    this.phone = phone;
    this.isLoggedIn = isLoggedIn;
  }

  get isReadyForSaving() {
    return this.email && this.phone && UserModel.isValidEmail(this.email);
  }

  get isValidEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email);
  }

  get isValidPhone() {
    return this.phone.length === PHONE_MASK.length;
  }

  /**
   * Clone user object
   * @param {UserModel|Object} user
   * @returns {UserModel}
   */
  static cloneUser(user) {
    const clone = Object.assign({}, user);
    Object.setPrototypeOf(clone, UserModel.prototype);
    return clone;
  }
}
