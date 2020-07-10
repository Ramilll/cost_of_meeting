// config/passport.js



// load up the user model
//var User            = require('../../app/models/user.js');

// expose this function to our app using module.exports
module.exports = function(passport, user) {

    // load all the things we need
    var LocalStrategy   = require('passport-local').Strategy;

    var User = user

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        //console.log('serializing => user.id: ', user.id)
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        //console.log("Deserializing => user.id ", id)
        User.findByPk(id).then(user=>{
            //console.log('Success on deserializing')
            done(null, user)
        }).catch(done);
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            User.findOne({where: {'email': email}})
                .then(user=>{
                    console.log('First')
                    if(!user) return done(null, false);
                    console.log('Second')
                    if(user.password !== password) return done(null, false)
                    console.log('Third')
                    return done(null, user.get())
                })//     .catch(err=>console.log(err));

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            /*
            User.findOne({where: {'email' : email}}, function(err, user) {
                // if there are any errors, return the error before anything else
                console.log('First')
                if (err){
                    return done(err);
                }
                console.log('Second')
                // if no user is found, return the message
                if (!user){
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                console.log('Third')
                // if the user is found but the password is wrong
                if (!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
                console.log('Fourth')
                // all is well, return successful user
                return done(null, user);
            });
            */


        }));

};

