const transporter = require('../config/nodemailer');

function sendMail(email, vCode) {
    // Setup mail options
    let mailOptions = {
        from: 'uaoldmates@gmail.com',
        to: email,
        subject: "Email Verification Code",
        html: `<body><h1>Your email verification code is below</h1><p>Here is your email verification code: <span style="color: red; font-size: 20px;">${vCode}</span><br>Please do not share this code with anyone else.</p> <h3 style="margin-bottom: 10px;">If you didn't request for this code, please ignore this email.</h3></body>`
    }

    // Send the verification code to email
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {console.log(err);}
        else {console.log(`Email sent: ${info.response}`);}
    });
}

module.exports = sendMail;