export default class BookingModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   * @param {CenterModel} center
   * @param {Array} service
   * @param {MasterModel} master
   * @param {Date} date
   * @param {TimeModel} time
   */
  constructor(id = '', center = null, service = null, master = null, date = null, time = null) {
    this.id = id;
    this.center = center;
    this.service = service;
    this.master = master;
    this.date = date;
    this.time = time;

    // Fields for rescheduling
    this.invoiceId = 0;
    this.guestId = 0;
  }

  get isReadyForGettingAvailableTimes() {
    return Boolean(this.center && this.center.id
      && this.service && this.service.length > 0);
  }

  get isReadyForBookingCreating() {
    return Boolean(this.isReadyForGettingAvailableTimes
      && this.date
      && this.time);
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
    const dateStr = `${day}-${month}-${year} at ${this.time.getTime()}`;

    const serviceStr = this.service.map(s => s.getLabel()).join(', ');
    return `${serviceStr} with ${this.master.nickname} @ Easton London ${this.center.label} ${dateStr}`;
  }

  /**
   * Clone booking object
   * @param {BookingModel|Object} booking
   * @returns {BookingModel}
   */
  static cloneBooking(booking) {
    const clone = Object.assign({}, booking);
    Object.setPrototypeOf(clone, BookingModel.prototype);
    return clone;
  }
}
