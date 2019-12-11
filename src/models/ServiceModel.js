export default class ServiceModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   * @param {String} label
   * @param {String} description
   * @param {Integer} duration
   * @param {Number} price
   */
  constructor(id = '', label = '', description = '', duration = 0, price = 0) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.duration = duration;
    this.price = price;

    // Fields for rescheduling
    this.invoiceItemId = 0;
  }

  getLabel() {
    return `${this.label} (${this.duration} mins) - £${this.price}`;
  }

  static makeServiceFromServerObject(serverObject) {
    const service = new ServiceModel();

    service.id = serverObject.id;
    service.label = serverObject.name;
    service.description = serverObject.description;
    service.duration = serverObject.duration;
    service.price = serverObject.price_info.sale_price;

    return service;
  }
}
