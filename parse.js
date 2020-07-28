var request = require('request');

var URL = 'http://www.ferra.ru/ru/techlife/news/';

request(URL, function (err, res, body) {
    if (err) throw err;
    console.log(body);
    console.log(res.statusCode);
});