const jwt = require('jsonwebtoken');


const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_WORD, {
        expiresIn: "20s",
    });
}


module.exports = generarJWT;