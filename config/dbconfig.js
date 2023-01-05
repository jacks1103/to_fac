const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'two_factor' 
});

connection.connect(function (err) {
    if(err) throw err;
    console.log("Database connection established");
});

module.exports = connection;