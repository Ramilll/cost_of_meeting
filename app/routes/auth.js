var authController = require('../../controllers/authcontroller.js');


module.exports = function(app, passport) {

    app.get('/userboard',isLoggedIn, authController.userboard);

    app.get('/login', authController.login);

    //app.post('/login', passport.authenticate('strategy', {
    //    successRedirect : '/userboard', // redirect to the secure profile section
    //    failureRedirect : '/login', // redirect back to the signup page if there is an error
    //}));

    app.post("/login" , function (req, res) {
        var email = req.body.email
        var password = req.body.password
        console.log(email, password)
    })

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/login');

    }

}