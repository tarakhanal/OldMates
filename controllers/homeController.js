const mongoose = require('mongoose');
const User = require('../models/User');
const loggedInUsers = require('./loggedInUsers');

mongoose.connect("mongodb://localhost:27017/OldMates");

const homeController = (req, res) => {
    let userLoggedIn = loggedInUsers.get(req.sessionID);
    console.log("Let's see: ", userLoggedIn);
    if(userLoggedIn) {
        res.render('home', {firstName: userLoggedIn.FirstName, lastName: userLoggedIn.LastName});
    }
    else {
        console.log("You are not logged in!");
        res.redirect('/');
    }

}

module.exports = homeController;
