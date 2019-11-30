export default class BookingModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   * @param {String} location
   * @param {String} service
   * @param {String} master
   * @param {Date} date
   * @param {String} time
   */
  constructor(id = '', location = '', service = '', master = '', date = '', time = '') {
    this.id = id;
    this.location = location;
    this.service = service;
    this.master = master;
    this.date = date;
    this.time = time;
  }

  /**
   * Return formatting string
   *
   * @return {String}
   */
  formatBooking() {
    const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    const [month, day, year] = this.date
      .toLocaleDateString('en', dateOptions)
      .replace(',', '')
      .split(' ');
    // Example: 28-Oct-2019 at 12:00
    const dateStr = `${day}-${month}-${year} at ${this.time}`;

    return `${this.service} with ${this.master} @ Easton London ${this.location} ${dateStr}`;
  }
}
