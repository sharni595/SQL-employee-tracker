const mysql = require('mysql2');
const util = require('util');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'kool123kat',
        database: 'tracker'
    },
    console.log('Connected to the tracker database')
);

db.connect(function(err){
    if (err) throw err;
});

db.connect = util.promisify(db.connect);

module.exports = db;