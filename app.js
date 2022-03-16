const express = require('express');
const session = require('express-session');
const User = require('./models/User');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')) // To serve static files (css, images, js, etc.)
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('./routes/index'));
app.use('/register', require('./routes/register'));

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});
