var http = require('http');
var socket = require('socket.io');

function server(req,res){
    console.log('boop!');
    console.log('Sending html...');
    res.writeHead(200, {"Context-Type":"text/html"});
    res.end("Hey!");
}

app = http.createServer(server);
io = socket(app);
app.listen(80);

io.sockets.on('connection', function (socket) {
        socket.emit('message', 'You are connected!');
		socket.on('message', function (message) {
        console.log(message);
    });
});