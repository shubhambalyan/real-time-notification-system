var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.1.20',
  user     : 'shubham',
  password : 'shubham',
  database : 'shubham'
});
 
connection.connect();
 
var query=connection.query('DELETE FROM notiftable WHERE ID=9', function(err, rows, fields) {
  if (err) throw err;
 
console.log(rows.affectedRows);
});

 
connection.end();
