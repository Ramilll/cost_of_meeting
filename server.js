// берём Express

var express = require('express');
const mysql = require('mysql');

var app = express();


app.use(express.static('public'));


app.get('/', function(req, res) {
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

app.get('/all',function(req,res) {
    res.send(data)
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

// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({extended: false}); //test method: Post

// app.post("/registration", urlencodedParser, function (request, response) {
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body);
//     response.send(request.body);
// });