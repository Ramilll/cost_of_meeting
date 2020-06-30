const mysql = require('mysql');

console.log('Get connection ...');

const conn = mysql.createConnection({
    host: '192.168.200.64',
    port: 3306,
    user: 'sa',
    password: '123456',
    database: 'database'
});
/*
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'database'
});
*/

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});