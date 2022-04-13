const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const transporter = require('../config/nodemailer');
const randomCode  = require('../utils/generateRandomCode');
const sendEmail = require('../utils/sendEmailVerification');
const loggedInUsers = require('./loggedInUsers');
let users = require('./registeredUsers');

mongoose.connect("mongodb://localhost:27017/OldMates");

const registerController = async (req, res) => {
    try {

        const {firstName, lastName, email, password, confirm, birthday} = req.body;

        if(password != confirm)
            res.redirect('/'); // Password does not match

        // Check if user already exist
        const userExists = await User.where("Email").equals(`${email}`);

        if(userExists[0]) {
            console.log("User Already Exists!", email, "is already in the database!");
            res.redirect('/'); // Redirect user to login
        }
        
        const bd = new Date(birthday);
        BDay = { Day: Number(bd.getDate()+1), Month: bd.getMonth()+1, Year: Number(bd.getFullYear())}

        // Hash the password with a salt of 12
        const hash = await bcrypt.hash(password, 12);

        await User.create({
            FirstName: `${firstName}`,
            LastName: `${lastName}`,
            Email: `${email}`,
            Password: `${hash}`,
            Birthday: BDay,
            Verified: `${false}`
        });

        let vCode = randomCode();
        console.log("vCode: ", vCode);
        loggedInUsers.set(req.sessionID, {FirstName: firstName, LastName: lastName, Email: email, sessionID: req.sessionID});
        users.set(req.sessionID, {email: email, vCode: vCode});

        sendEmail(email, vCode);

        res.redirect('/verify');

    } catch(e) {
        console.log(e.message);
    }
    
}

module.exports = registerController;