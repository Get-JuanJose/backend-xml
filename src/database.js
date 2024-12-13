//const mysql = require('mysql2')
const { Pool } = require('pg');

//const mysqlConnection = mysql.createConnection({
//    host: 'sql5751672',
//    user: 'sql5751672',
//    password: 'GeqVAbSW4A',
//    database: 'sql5.freemysqlhosting.net',
//  port:3306,
//})

const mysqlConnection = new Pool({
connectionString: 'postgresql://movieshop_user:zP3QitlzPNpByoqWO3FMSSzFo1KSISrl@dpg-ctdgpmtumphs73837s0g-a.oregon-postgres.render.com/movieshop',
      ssl: {
        rejectUnauthorized: false
    }
})

mysqlConnection.connect(function (err) {
    if(err){
        console.log(err);
        return;
    } else{
        console.log('Db is connected')
    }
})

module.exports = mysqlConnection;
