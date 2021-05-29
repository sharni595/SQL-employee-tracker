const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'kool123kat',
        database: 'election'
    },
    console.log('Connected to the election database')
);

db.connect();

db.connect = util.promisify(db.connect);

module.exports = db;