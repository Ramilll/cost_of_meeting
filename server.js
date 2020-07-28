var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').config({path:'/.env'});
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

//For BodyParser
app.use(cookieParser("RamilKey")); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// For Passport
app.use(session({
    secret: 'RamilKey',
    resave: false,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//For Handlebars
app.use(express.static('public'));
app.set('views', (__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Cross-Domain configuration
app.use(allowCrossDomain);

//Models
var models = require("./app/models");

//Routes

var authRoute = require('./app/routes/auth.js')(app,passport);


//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

app.listen(process.env.PORT || 3008, function(err) {

    if (!err)

        console.log("Site is live");

    else console.log(err)

});
//Sync Database

models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')


}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});
