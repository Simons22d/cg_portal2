const mysql = require('promise-mysql');
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Devs2019c!?__",
    database: "wambuine_cargen",
    connectionLimit: 10,
    waitForConnections: false
});
 
pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

module.exports = pool;