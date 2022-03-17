const mongoose = require('mongoose');
const User = require('../models/User');
const loggedInUsers = require('./loggedInUsers');

mongoose.connect("mongodb://localhost:27017/OldMates");

const homeController = (req, res) => {
    let user = loggedInUsers.get(req.sessionID);
    
    if(!user) {
        console.log("You are not logged in!");
        res.redirect('/');
    }
    else
        res.render('home', {firstName: user.FirstName, lastName: user.LastName});
}

module.exports = homeController;