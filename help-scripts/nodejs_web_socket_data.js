var mysql = require('mysql');
var express = require('express');
//var http = require('http');
//var fs = require('fs');
var connection = mysql.createConnection({
  host     : '192.168.1.20',
  user     : 'shubham',
  password : 'shubham',
  database : 'shubham'
});
var app=express();
 
connection.connect();
 
app.get("/",function(req,res){
connection.query('SELECT * FROM notiftable', function(err, rows, fields) {
connection.end();
  if (err) throw err;
res.send(rows); //res.send(rows[0])==> prints the first row
});
});
app.listen(3000);
console.log('Listening at 3000.');
 

