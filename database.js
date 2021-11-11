var mysql = require('mysql2');
var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'sqlpwd',      // Replace with your database password
  port: '3306',
  database: 'test' // // Replace with your database Name
});
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;