'use strict'

const User = require('./user.model');

const { validateData, encrypt, checkPassword, removePassword, deleteSensitveData } = require('../utils/Validate');

const { createToken } = require('../Services/jwt');

const serverStatus = require('../Services/serverStatus');


let adminStatus = false;

exports.test = async(res) => {
    serverStatus.internal200(res,'User is running');
};



exports.loginUser = async(req, res) => {
    let user = {user: req.user};

    console.log(user);
    return serverStatus.internal200(res, 'check console log');

    //res.send({message: 'Test function is running', user: req.user});
};

exports.adminSave = async(req, res) => {
    try {
        adminStatus = true;
        await this.save(req, res);
    } catch (err) {
        console.log(err);
        return serverStatus.internal500(res, 'User not created', err);
    }
};



exports.save = async(req, res) => {
    try {
        
        let data = req.body;
        
        if(adminStatus == false) delete data.role;

        data.password = await encrypt(data.password);

        let user = new User(data); 

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


        if(!user || await checkPassword(data.password, user.password)) return serverStatus.internal403(res, 'Check your username or password', 'Invalid Credentials');

        let token = await createToken(user);

        console.log('Logged in as ', user.role);


        return serverStatus.internal200(res, `Success! ${token}`);  
        
    } catch (err) {
        console.error(err);
        return serverStatus.internal500(res, 'Login error, not logged in.', err);
    }
};

exports.update = async(req, res)=>{
    try{
        let userId = req.params.id;
        let data = req.body;
        let userLoggedIn = {user: req.user};

        console.log(userLoggedIn);

        if(userId !== userLoggedIn.user.sub) return serverStatus.internal403(res, 'Access Denied', 'Not your user');

        removePassword(data);

        let userUpdated = await User.findOneAndUpdate(
            {_id: userId},
            data,
            {new: true} 
        );
        if(!userUpdated) return serverStatus.internal404(res, 'User not found');
        await deleteSensitveData(userUpdated);
        return serverStatus.customStatus(res, 200, userUpdated);
    }catch(err){
        console.error(err);
        return serverStatus.internal500(res, 'User not updated', `Username ${err.keyValue.username} is already taken`);
    }
}


exports.deleted = async(req, res) => {
    try {
        let userId = req.params.id;

        let userData = await User.findOne({_id: userId}).catch(err => console.error(err));

        let userLoggedIn = {user: req.user}

        console.log(userLoggedIn);

        if(userData.role == 'ADMIN' && userLoggedIn.user.role == 'ADMIN' ) return serverStatus.internal403(res, "You don't have permissions", 'Access Denied');
        
        if(userLoggedIn.user.role == 'CLIENT' && userLoggedIn.user.username !== userData.username) return serverStatus.internal403(res, 'You can only delete your user', 'Access Denied');
        
        let userDeleted = await User.findOneAndDelete({_id: userId});

        
        
        return serverStatus.internal202(res, `Deleted Account name: ${userDeleted.username} action by ${userLoggedIn.user.username}`);
        
    } catch (err) {
        console.error(err);
        return serverStatus.internal500(res, 'Deletion error, user not deleted', err);
    }
};







