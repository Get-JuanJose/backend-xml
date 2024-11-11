const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
    host: 'bu8jsnccetgp37myqw1g-mysql.services.clever-cloud.com',
    user: 'u6pywbvgcv04n18v',
    password: 'GqL0PP0CfPkrjlmef2Oo',
    database: 'bu8jsnccetgp37myqw1g'
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