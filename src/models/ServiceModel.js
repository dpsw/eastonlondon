export default class ServiceModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   * @param {String} name
   * @param {String} description
   * @param {Integer} duration
   * @param {Number} price
   */
  constructor(id = '', name = '', description = '', duration = 0, price = 0) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.price = price;
  }

  getLabel() {
    return `${this.name} (${this.duration}mins) - £${this.price}`;
  }

  static makeServiceFromServerObject(serverObject) {
    const service = new ServiceModel();

    service.id = serverObject.id;
    service.name = serverObject.name;
    service.description = serverObject.description;
    service.duration = serverObject.duration;
    service.price = serverObject.price_info.sale_price;

    return service;
  }
}
