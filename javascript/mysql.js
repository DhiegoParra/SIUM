const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'pass',
    database:'sium'
})

connection.connect((error) =>
{
    if(error) throw error
    console.log('La conexion funciona')
})

connection.end()