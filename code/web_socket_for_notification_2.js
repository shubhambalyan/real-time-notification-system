var app=require('http').createServer(handler);
var io=require('socket.io').listen(app);
var fs=require('fs');
var mysql=require('mysql');
var connection=mysql.createConnection({
    host : '192.168.1.20',
    user : 'shubham',
    password : 'shubham',
    database : 'shubham',
    multipleStatements: true
}),
time = 1000,
t;
connection.connect(function(err) {
  if(err)
      throw err;
});
app.listen(4000);
function handler(req,res){
    fs.readFile( __dirname + '/view_notification_2.html',function(err,data){
        if(err)
            throw err;
        res.writeHead(200);
        res.end(data);
    });
}
var con=[];
var repeats=function(){
    var query=connection.query('SELECT * FROM notiftable ORDER BY ID DESC'),
        notif=[];
    query.on('error',function(err){
        if(err)
            throw err;
        updates(err);       
    })
    .on('result',function(user){
        notif.push(user);
    })
    .on('end',function(){
        if(con.length){
            t=setTimeout(repeats,time);
            updates({notif:notif});
        }
    });
};
io.sockets.on('connection',function(websocket){   
    if (!con.length){
        repeats(); }
    con.push(websocket);   
});
var updates=function(data){
    data.time = new Date();
    con.forEach(function(tmp){
        tmp.volatile.emit('notif',data);
    });
};