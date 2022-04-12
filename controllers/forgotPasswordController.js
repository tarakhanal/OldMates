const transporter = require('../config/nodemailer');
const randomCode  = require('../utils/generateRandomCode');
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect("mongodb://localhost:27017/OldMates");

const getForgotPasswordController = async (req, res) => {
    res.render('forgotPassword');
}

let Users = new Map();
const postForgotPasswordController = async (req, res) => {
    const {email} = req.body;

    const userExist = await User.findOne({Email: email});

    if(!userExist) {
        console.log("Cannot reset password for non-existing user");
        res.redirect('/forgot-password');
    } else {
        if(Users.get(email))
            Users.delete(email);

            // Generate new code
            let code = randomCode();

            Users.set(email, code);

            // Send a new code to email
            let mailOptions = {
                from: 'uaoldmates@gmail.com',
                to: email,
                subject: "Your password reset code",
                html: `<body><h1>Your password reset code is below</h1><p>Here is your password reset code: <span style="color: red; font-size: 20px;">${code}</span><br>Please do not share this code with anyone else.</p> <h3 style="margin-bottom: 10px;">If you didn't request for this code, please ignore this email.</h3></body>`
            }
            console.log(mailOptions);
            // Send the verification code to email
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {console.log(err);}
                else {console.log(`Email sent: ${info.response}`);}
            });
            // Redirect user to verify
            res.redirect('/');
    }
}

module.exports = {getForgotPasswordController, postForgotPasswordController, Users}