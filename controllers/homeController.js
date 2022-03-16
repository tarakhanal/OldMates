const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect("mongodb://localhost:27017/OldMates");

const homeController = (req, res) => {
    res.render('home');
}

module.exports = homeController;