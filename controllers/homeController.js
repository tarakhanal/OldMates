const mongoose = require('mongoose');
const User = require('../models/User');
const loggedInUsers = require('./loggedInUsers');

mongoose.connect("mongodb://localhost:27017/OldMates");

const homeController = (req, res) => {
    res.render('home', {name: "Tara"});
}

module.exports = homeController;