const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mydatabase.cw7rba78ytpy.eu-central-1.rds.amazonaws.com',
    port: 3306,
    user: 'adminadmin',
    password: 'adminadmin',
    database: 'MyDatabase'
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});