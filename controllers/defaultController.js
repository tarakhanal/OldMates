const loggedInUsers = require('./loggedInUsers');

const defaultController = (req, res) => { 
    let userLoggedIn = loggedInUsers.get(req.sessionID);
    if(userLoggedIn) {
        console.log(userLoggedIn.FirstName, "you are already logged in!");
        res.redirect('/home');
    }
    else
        res.render('../views/landing')
}

module.exports = defaultController;