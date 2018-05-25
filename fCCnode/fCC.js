var http = require('http');
var socket = require('socket.io');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

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
		socket.on('message', function (message) {
			ccData = JSON.parse(message);
			MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var dbo = db.db("fcc");
				for (item in ccData.items){
					dbo.collection('items').insertOne(ccData.items[item], function(err, res) {  
						if (err) throw err;
						console.log("1 document inserted");
					});
				}
				for (item in ccData.orders){
					dbo.collection('orders').insertOne(ccData.orders[item], function(err, res) {  
						if (err) throw err;
						console.log("1 document inserted");
					});
				}
				db.close();
			  });
			      console.log(message);
			});

    });

