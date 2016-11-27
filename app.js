var app = require('express')();
var server = require('http').Server(app);
var child_process = require('child_process').exec;
var path = require('path');
var io = require('socket.io')(server);


server.listen(3000, function(){
    console.log('listening on *:3000');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var currentDir = path.resolve(process.cwd(), '..');

io.on('connection', function(socket){
    socket.on('input', function(data){
        child_process(data, {cwd: currentDir}, function(error, stdout, stderr){
            socket.emit('output', {'out': stdout, 'directory':currentDir});
            socket.emit('output', {'out': stderr, 'directory':currentDir});
        });
    });
});
