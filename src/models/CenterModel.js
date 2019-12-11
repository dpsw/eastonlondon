export default class CenterModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   * @param {String} name
   * @param {String} city
   * @param {String} address
   */
  constructor(id = '', name = '', city = '', address = '') {
    this.id = id;
    this.label = name;
    this.address = address;
    this.city = city;
  }

  static makeCenterFromServerObject(serverObject) {
    const center = new CenterModel();
    center.id = serverObject.id;
    center.label = serverObject.display_name;

    const addressInfo = serverObject.address_info;
    center.address = addressInfo.address_1;
    if (addressInfo.address_2) {
      center.address = `${addressInfo.address_1}, ${addressInfo.address_2}`;
    }

    center.city = serverObject.state.name;

    return center;
  }
}
