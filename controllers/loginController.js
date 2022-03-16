const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect("mongodb://localhost:27017/OldMates");

let loggedInUsers = new Map();

const loginController = async (req, res) => {
    try {

        const {username, password} = req.body;
        let user = await User.where('Email').equals(`${username}`);
        user = user[0];

        if(!user) {
            console.log("Invalid user id");
            return res.redirect('/');
        }

        let realPassword = user.Password;
        console.log("Real Password: ", realPassword, "\n User Password: ", password);
        const correctPassword = await bcrypt.compare(password, realPassword).catch(err => { console.log(err); });

        if(correctPassword) {
            loggedInUsers.set(user.Email, {FirstName: user.FirstName, LastName: user.LastName, Email: user.Email, sessionID: req.sessionID});
            console.log(user.FirstName, "was logged in successfully!");
            console.log("Logged In Users: ", loggedInUsers);
            res.redirect('/home');
        } else {
            console.log("Invalid username or password");
            res.redirect('/');
        }

    } catch(e) {
        console.log(e.message);
    }
}

module.exports = loginController;