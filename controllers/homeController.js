const mongoose = require('mongoose');
const User = require('../models/User');
const loggedInUsers = require('./loggedInUsers');

mongoose.connect("mongodb://localhost:27017/OldMates");

const homeController = async (req, res) => {
    let userLoggedIn = loggedInUsers.get(req.sessionID);
    console.log("Let's see: ", userLoggedIn);
    if(userLoggedIn) {
        let user = await User.where('Email').equals(`${userLoggedIn.Email}`);
        user = user[0];
        let profilePic = user.ProfilePicture;
        console.log("Profile Pic: ", profilePic);
        res.render('home', {firstName: userLoggedIn.FirstName, lastName: userLoggedIn.LastName, profilePic});
    }
    else {
        console.log("You are not logged in!");
        res.redirect('/');
    }

}

module.exports = homeController;
