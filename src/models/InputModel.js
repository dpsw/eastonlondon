export default class InputModel {
  /**
   * Input constructor
   *
   * @param {String} label
   * @param {String} value
   * @param {String} errorMessage
   * @param {String} placeholder
   * @param {Array} values
   */
  constructor(label, value, errorMessage = '', placeholder = '', values = []) {
    this.label = label;
    this.value = value;
    this.errorMessage = errorMessage;
    this.placeholder = placeholder.length > 0 ? placeholder : label;
    this.mask = '';
    this.values = values;
  }

  setMask(mask) {
    this.mask = mask;
  }

  setValues(values) {
    this.values = values;
  }
}
