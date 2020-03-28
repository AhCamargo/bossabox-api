const { promisify } = require('util');
const Bcrypt = require('bcrypt');

const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = parseInt(process.env.SALT);

class PasswordHelper {
  static hashPassword(password) {
    return hashAsync(password, SALT);
  }

  static comparePassword(password, hash) {
    return compareAsync(password, hash);
  }
}

module.exports = PasswordHelper;
