
var mysql = require('mysql')


var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_gravesn',
    password        : '9274',
    database        : 'cs340_gravesn',
    multipleStatements: true 
})

module.exports.pool = pool;