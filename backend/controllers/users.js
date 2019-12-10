const helper = require('../services/helper');
const db = require('./db');

exports.signUp = async (req, res) => {
  const isExist = await db.isExistUser(req.body.email);
  if (!isExist) {
    await db.addUser(req.body.email, req.body.password);
    return res.status(201).json({ success: true });
  }
  const error = helper.generateError('existedUser');
  return res.status(error.code).json(error);
};

exports.signIn = async (req, res) => {
  const user = await db.authUser(req.body.email, req.body.password);
  if (user) {
    return res.status(200).json({ success: true });
  }
  const error = helper.generateError('notAuth');
  return res.status(error.code).json(error);
};
