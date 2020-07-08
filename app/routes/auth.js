var authController = require('../../controllers/authcontroller.js');
//const bodyParser = require("body-parser");
//const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app, passport) {

    app.get('/userboard', isLoggedIn, authController.userboard);

    app.get('/login', authController.login);

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/userboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        //failureFlash : true // allow flash messages
    }));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())  // <-- typo here
            return next();
        res.redirect('/login');
    }

}