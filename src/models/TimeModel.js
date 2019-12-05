import { AVAILABLE_MINUTES } from '@/config/config';

export default class TimeModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   */
  constructor(id = '') {
    this.id = id;
  }

  /**
   * Get time
   * @returns {String}
   */
  getTime() {
    const time = this.id.split('T')[1];
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  isCorrect() {
    const minutes = this.getTime().split(':')[1];
    return AVAILABLE_MINUTES.includes(minutes);
  }
}
