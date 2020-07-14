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

app.listen(process.env.PORT || 3000, function(err) {

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



/*
const express = require('express');
const app = express();
const flash = require('connect-flash');
const passport   = require('passport')
const session = require('express-session');
const bodyParser = require("body-parser");
const env = require('dotenv').config({path:'/.env'});


var authRoute = require('./app/routes/auth.js')(app,passport);
require('./config/passport/passport.js')(passport, models.user);

app.use(passport.initialize());
app.use(passport.session())
app.use(flash());
app.use(express.static('public'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'Ramil',resave: true, saveUninitialized:true})); // session secret



app.set('views', (__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(3000);
// отправляем сообщение
console.log('Сервер стартовал!');


/*models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});*/

/*
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/login.html");
});
*/
/*

app.get('/createMeeting', function(req, res) {
    res.sendFile(__dirname + "/public/createMeeting.html");
});
// запускаем сервер на порту 3000

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/public/login.html");
});
app.get('/director', function(req, res) {
    res.redirect("director.html");
});

app.post("/meeting" , urlencodedParser, function (req, res) {
    console.log(req.body);
    res.redirect("meeting");
});

app.post(["/", "/login"] , function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var email = req.body.email
    var password = req.body.password
    console.log(email, password)
    let sqlMessage = "SELECT * FROM authorization WHERE email = '"+ email + "'"
    connection.query(sqlMessage,
        function(err, results, fields) {
            if (err) console.log(err);
            if (results.length == 0) res.send("This email was not found");
            else if (results.find(el => el.password === password)) res.send(results);
            else res.send("Incorrect password");
        });
});

app.get('/direct',function(req,res) {
    connection.query("SELECT name, meetingTime, costMeetingTime FROM users",
        function(err, results, fields) {
            if (err) console.log(err);
            res.send(results); // собственно данные
        });
})


app.get('/meeting/all',function(req,res) {
    connection.query("SELECT * FROM meetings",
        function(err, results, fields) {
            if (err) console.log(err);
            res.send(results); // собственно данные
        });
})

app.get('/meeting/:meetingId/create',function(req,res) {
    let start = new Date()
    res.send("Встреча " + req.params.meetingId + " была создана " + start)
})

app.get('/meeting/:meetingId/stop',function(req,res) {
    let end = new Date()
    res.send("Встреча " + req.params.meetingId + " была завершена " + end)
})

app.get('/meeting/:meetingId',function(req,res) {
    res.send(data.meetings.find(item => item.id == req.params.meetingId))
})

app.get('/user/:userId',function(req,res) {
    res.send(data.users.find(item => item.id == req.params.userId))
})
*/