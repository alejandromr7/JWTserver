const bcrypt = require('bcrypt');

const encryptarPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = encryptarPassword;