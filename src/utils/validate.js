'use strict'

const bcrypt = require('bcrypt');

exports.validateData = (data) =>{
    let keys = Object.keys(data), msg = '';
    for (let key of keys) {
        if( data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
        //if(!data[key]) continue;
        msg += ` The Param "${key}" is required -`;
    }
    
    return msg.trim();
};


exports.encrypt = async(password) =>{
    try {
        return bcrypt.hashSync(password, 10);
    } catch (err) {
        console.log(err);
        return err;
    }
};


exports.checkPassword = async(password, hash) => {
    try {
        return bcrypt.compare(password, hash);
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.deleteSensitveDate = (user) =>{
    try {
        delete user.password;
        delete user.role;
    } catch (err) {
        console.log(err);
        return false;
    }
}


/* exports.deleteOneEntry = update, delEntry => {
    if (!update) return update;
    delete update.password;
    return update;
}; */