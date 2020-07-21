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
                    if(!user) return done(null, false, {message: "User not found"});
                    if(user.password !== password) return done(null, false, {message: "Incorrect password"})
                    return done(null, user.get())
                }).catch(err=>console.log(err));

        }));

};

