require('dotenv').config();

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + (1000 * 60 * 60 * 5), // Expires in 5 hours
        maxAge: (1000 * 60 * 60 * 5)
    }
}

module.exports = sessionConfig;