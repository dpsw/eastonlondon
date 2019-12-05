export default class MasterModel {
  /**
   * Booking constructor
   *
   * @param {String} id
   * @param {String} name
   * @param {String} nickname
   */
  constructor(id = '', name = '', nickname = '') {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
  }

  static makeMasterFromServerObject(serverObject) {
    const master = new MasterModel();

    const personalInfo = serverObject.personal_info;
    master.id = serverObject.id;
    master.name = `${personalInfo.first_name} ${personalInfo.last_name}`;
    master.nickname = personalInfo.nick_name;

    return master;
  }
}
