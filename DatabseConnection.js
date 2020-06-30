const mysql = require('mysql');

console.log('Get connection ...');
<<<<<<< HEAD

const connection = mysql.createConnection({
=======
/*
const conn = mysql.createConnection({
>>>>>>> 9a54deeed1b2ddf6b23474b6b76a31a83f49af6c
    host: '192.168.200.64',
    port: 3306,
    user: 'remoteUser',
    password: 'remoteUser',
    database: 'database'
});
<<<<<<< HEAD

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!\n");
});
=======
*/
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'database'
});

>>>>>>> 9a54deeed1b2ddf6b23474b6b76a31a83f49af6c

connection.query("SELECT * FROM users",
    function(err, results, fields) {
        if (err) console.log(err);
        console.log(results); // собственно данные
    });

connection.end(function(err) {
    console.log('\nClosing the connection ...')
    if (err) throw err;
    console.log("Connection is closed!");
});
