const mongoose = require('mongoose');
const loggedInUsers = require('./loggedInUsers');
const User = require('../models/User');
let users = require('./registeredUsers');

const getVerifyEmailController = async (req, res) => {
    res.render('verifyEmail');
}

const postVerifyEmailController = async (req, res) => {
    let userCode = req.body.vCode;
    let actualCode = users.get(req.sessionID).vCode;
    const email = loggedInUsers.get(req.sessionID).email;
    
    console.log("User Code:", userCode, "\nActual Code:", actualCode);
    if(userCode == actualCode) {
        await User.updateOne({email: email}, {Verified: true});
        
        res.redirect('/home');
    }
    else {
        res.redirect('/verify'); // not verified
    }
}

module.exports = {getVerifyEmailController, postVerifyEmailController};