const mysql = require('mysql');

console.log('Get connection ...');

const connection = mysql.createConnection({
    host: '192.168.200.64',
    port: 3306,
    user: 'remoteUser',
    password: 'remoteUser',
    database: 'database'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!\n");
});

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
