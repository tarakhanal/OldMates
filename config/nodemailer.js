require('dotenv').config();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(({
    service: process.env.SERVICE,
    auth: {
        user: process.env.API_USER,
        pass: process.env.API_KEY
    }
}));

module.exports = transporter;