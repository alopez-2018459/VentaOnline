'use strict'

const User = require('./user.model');

const { validateData, encrypt, checkPassword } = require('../utils/Validate');

const { createToken } = require('../Services/jwt');

const serverStatus = require('../Services/serverStatus');

exports.test = async(req, res) => {
    serverStatus.internal200(res,'User is running');
};

exports.save = async(req, res) => {
    try {
        let data = req.body;
        
        delete data.role;

        data.password = await encrypt(data.password);

        let user = new User(data);

        console.log(user);

        await user.save();

        return serverStatus.internal200(res, 'User Created');
    } catch (err) {
        console.error(err);
        return serverStatus.internal500(res, 'User not Created', err);
    }
};

exports.login = async(req, res) => {
    try {
        let data = req.body;

        let credentials = {
            username: data.username,
            password: data.password
        }        
        let msg = validateData(credentials);
        if(msg) return serverStatus.internal400(res, msg);

        let user = await User.findOne({username: data.username});

        let passCheck = await checkPassword(data.password, user.password);

        if(!user || !passCheck) return serverStatus.internal403(res, 'Check your username or password', 'Invalid Credentials');

        let token = await createToken(user);

        console.log('Logged in as ', user.role);

        return serverStatus.internal200(res, `Success! ${token}`);  
        
    } catch (err) {
        console.error(err);
        return serverStatus.internal500(res, 'Login error, not logged in.', err);
    }
};



