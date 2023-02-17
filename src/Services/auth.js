'use strict'

const jwt = require('jsonwebtoken');
const { internal403 } = require('./serverStatus');


//Middleware

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'Authorization Headers no content.'});
    } else {
        try {
            let token = req.headers.authorization.replace(/['"]/g, '');

            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`);

        
    
            if (Math.floor(Date.now() / 1000) >= payload.exp) {
                return internal403(res, 'Session Expired', err);
            }    
        } catch (err) {
            console.error(err);
            return res.status(400).send({message: 'Invalid Token'});
        }
        req.user = payload;
        next();
    };

}



exports.isAdmin = async(req, res, next) =>{
    try {
        let user = req.user;
        if(user.role !== 'ADMIN') return internal403(res, 'Access Denied',);
        next();
    } catch (err) {
        console.error(err);
        return res.status(400).send('Role auth error');
    }
};