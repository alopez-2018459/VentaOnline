'use strict'

const jwt = require('jsonwebtoken');

exports.createToken = (user) => {
    try {
         let payload = {
            sub: user._id,
            name: user.name,
            surname: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            iat: Date.now(), //Formato UNIX fecha en segundos a partis de el 1 de enero 1970
            exp:Date.now() + (60 * 120) //Fecha actual más 2 horas.
         }
         return jwt.sign(payload, `${process.env.SECRET_KEY}`);
    } catch (err) {
        console.log('Json web token error in jwt.js file', err);
        return err;
    }
};