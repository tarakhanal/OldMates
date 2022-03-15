const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect("mongodb://localhost:27017/OldMates");

const registerController = async (req, res) => {
    try {

        const {firstName, lastName, email, password, confirm, birthday} = req.body;

        if(password != confirm)
            res.redirect('/'); // Password does not match

        // Check if user already exist
        if(User.where("Email").equals(`${email}`)) {
            console.log("User Already Exists!");
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
            Birthday: BDay
        });

        console.log(firstName, lastName, email, password, confirm, birthday);
        res.redirect('/');

    } catch(e) {
        console.log(e.message);
    }
    
}

module.exports = registerController;