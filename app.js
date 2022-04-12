const express = require('express');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')) // To serve static files (css, images, js, etc.)
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session(require('./config/session')));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/home', require('./routes/home'));
app.use('/forgot-password', require('./routes/forgotPassword'));

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});
