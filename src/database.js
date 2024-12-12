const mysql = require('mysql2')
const { Pool } = require('pg');

//const mysqlConnection = new Pool({
//    host: 'dpg-ctdgpmtumphs73837s0g-a',
//    user: 'movieshop_user',
//    password: 'zP3QitlzPNpByoqWO3FMSSzFo1KSISrl',
//    database: 'movieshop',
//  port:5432,
//})

const mysqlConnection = new Pool({
connectionString: 'postgresql://movieshop_user:zP3QitlzPNpByoqWO3FMSSzFo1KSISrl@dpg-ctdgpmtumphs73837s0g-a.oregon-postgres.render.com:5432/movieshop',
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
