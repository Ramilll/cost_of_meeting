// берём Express

var express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false}); //test method: Post

var app = express();


app.use(express.static('public'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/public/register.html");
});
app.get('/createMeeting', function(req, res) {
    res.sendFile(__dirname + "/public/createMeeting.html");
});
// запускаем сервер на порту 3000
app.listen(3000);
// отправляем сообщение
console.log('Сервер стартовал!');

const connection = mysql.createConnection({
    host: '192.168.200.64',
    port: 3306,
    user: 'remoteUser',
    password: 'remoteUser',
    database: 'database'
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + "/public/register.html");
});
app.get('/director', function(req, res) {
    res.sendFile(__dirname + "/public/director.html");
});

app.post(["/", "/login"] , urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    var email = req.body.email
    var password = req.body.password
    console.log(email, password)
    let sqlMessage = "SELECT * FROM authorization WHERE email = '"+ email + "'"
    connection.query(sqlMessage,
        function(err, results, fields) {
            if (err) console.log(err);
            if (results.length == 0) res.send("This email was not found");
            else if (results.find(el => el.password === password)){
                if ((results.find(el => el.password === password).role == 'admin')) res.redirect('createMeeting.html')
                else if (results.find(el => el.password === password).role == 'director') res.redirect('director.html')
                else if (results.find(el => el.password === password).role == 'user') res.redirect('user.html')
            }
            else res.send("Incorrect password");
        });

    //res.send('Everything is good')
});

app.get('/direct',function(req,res) {
    connection.query("SELECT name, meetingTime, costMeetingTime FROM users",
        function(err, results, fields) {
            if (err) console.log(err);
            res.send(results); // собственно данные
        });
})

app.get('/user/all',function(req,res) {
    connection.query("SELECT * FROM users",
        function(err, results, fields) {
            if (err) console.log(err);
            res.send(results); // собственно данные
        });
})

app.get('/wage/all',function(req,res) {
    connection.query("SELECT * FROM wages",
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


/*
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