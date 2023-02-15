'use strict'

const jwt = require('jsonwebtoken');


//Middleware

exports.ensureAuth = (req, res, next) => {
    if (!req.headers.Authorization) {
        return res.status(403).send({message: 'Authorization Headers no content.'});
    } else {
        try {
            let token = req.header.Authorization.replace(/['"]/g, '');

            var payload = jwt.decode(token, `${process.env.SECRET_KEY}`);
    
            if (payload.exp >= Date.now()) {
                return res.status(403).send({message: 'Session Expired'});
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
        if(user.role !== 'ADMIN') return res.statust(403).send('Access Denied');
        next();
    } catch (err) {
        console.error(err);
        return res.status(400).send('Role auth error');
    }
};