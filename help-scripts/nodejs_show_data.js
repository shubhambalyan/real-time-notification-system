var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.20',
  user     : 'shubham',
  password : 'shubham',
  database : 'shubham'
});
 
connection.connect();
 
connection.query('SELECT * FROM notiftable', function(err, rows, fields) {
  if (err) throw err;
 
console.log(rows);
});

 
connection.end();
