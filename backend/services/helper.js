const bcrypt = require('bcrypt');

exports.cryptPassword = async (password) => {
  const saltRounds = 10;

  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

exports.comparePassword = async (plainPass, hashword) => await new Promise((resolve, reject) => {
  bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
    if (err) reject(err);
    resolve(isPasswordMatch);
  });
});

exports.getUserFromDBEntity = userEntity => ({
  id: userEntity.id,
  email: userEntity.email,
});

exports.generateError = (errorCode) => {
  let error = null;

  switch (errorCode) {
    case 'notAuth':
      error = {
        code: 200,
        error: {
          errorId: 1,
          message: 'Username or password is incorrect.',
        },
      };
      break;

    case 'existedUser':
      error = {
        code: 200,
        error: {
          errorId: 2,
          message: 'User with same email is already exist in the system.',
        },
      };
      break;

    default:
      error = {
        code: 500,
        error: {
          errorId: 0,
          message: 'Internal server error',
        },
      };
  }

  return error;
};
