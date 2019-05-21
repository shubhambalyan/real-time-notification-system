var mysql = require('mysql');
var app = require('express')();
var fs = require('fs');
var http = require('http');

var pool=mysql.createPool({
    connectionlimit: 100,
    host: '192.168.1.20',
    user: 'shubham',
    password: 'shubham',
    database: 'shubham',
    debug: false
});

//connection.connect();
var server;

server = http.createServer(function(req, res){
pool.getConnection(function(err,connection){
    if (err) throw err;
//server = http.createServer(function(req, res){
//app.get('/', function (req, res) {
    fs.readFile('welcome.html', function (err, data) {
        if (err)
            throw err;        
        //res.writeHeader(200, {"Content-Type": "text/html"}); //optional
        res.write(data);
        //res.end();
    });
    //res.writeHeader(200, {"Content-Type": "text/html"});
    connection.query('SELECT * FROM notiftable', function (err, rows, fields)
    {
        if (err)
        {
            throw err;
        }
        //res.writeHead(200, {"Content-Type": "text/plain"});
        res.write('<style>td{height:30px; padding:7px;} tr:hover{background-color: #F5F5DC;} th{background: green;}</style>');
        res.write('<table border="1" style="margin-left: 300px; border-collapse: collapse;">');
        res.write('<tr><th>ID</th><th>Message</th><th>Datecreated</th><th>Link</th><th>Visit</th></tr>');
        for (var i in rows){
        res.write('<tr><td>');
        res.write(JSON.stringify(rows[i].ID));
        res.write('</td><td>');
        res.write(JSON.stringify(rows[i].message));
        res.write('</td><td>');
        res.write(JSON.stringify(rows[i].datecreated));
        res.write('</td><td>');
        res.write(JSON.stringify(rows[i].link));
        res.write('</td><td>');
        res.write('<a href='+JSON.stringify(rows[i].link)+'target=_blank>Click Here</a>');
        res.write('</td></tr>');
        }
        res.write('</table>');
    res.end();
    });
    connection.end();
});
});
//});
server.listen(3000);
var io = require('socket.io').listen(server);
//app.listen(3000);

io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
        socket.emit('date', {'date': new Date()});
    },1000);
});

console.log('Listening at :3000');