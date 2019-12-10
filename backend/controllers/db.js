const mysql = require('mysql2/promise');
const helper = require('../services/helper');

const {
  MYSQL_HOST,
  MYSQL_USERNAME,
  MYSQL_PASS,
  MYSQL_DB_NAME,
} = process.env;

let connection = null;

exports.initialiseConnection = async () => {
  connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASS,
    database: MYSQL_DB_NAME,
  });
};
this.initialiseConnection();

exports.isExistUser = async (email) => {
  const [rows] = await connection.execute(`SELECT * FROM \`users\` WHERE \`email\` = '${email}'`);
  return !!(rows && rows.length);
};

exports.addUser = async (email, password) => {
  const isExist = await this.isExistUser(email);
  if (!isExist) {
    const cryptPass = await helper.cryptPassword(password);
    await connection.execute(
      `INSERT INTO \`users\` (\`email\`, \`password\`) VALUES ('${email}','${cryptPass}');`,
    );
    return true;
  }
  return false;
};

exports.authUser = async (email, password) => {
  let user = null;
  const [rows] = await connection.execute(`SELECT * FROM \`users\` WHERE \`email\` = '${email}'`);
  if (rows.length) {
    try {
      const isEqualPass = await helper.comparePassword(password, rows[0].password);
      if (isEqualPass) {
        user = helper.getUserFromDBEntity(rows[0]);
      }
    } catch (e) {
      console.log(e.message);
    }
  }
  return user;
};
