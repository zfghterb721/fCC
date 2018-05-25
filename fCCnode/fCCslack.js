var http = require('http');
var socket = require('socket.io');
const { WebClient } = require('@slack/client');
require('dotenv').config()

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;
console.log(token);

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'CAWHPJ5DK';

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
			var slackMessage = "";
			for (item in ccData.items){
				slackMessage += "Someone bought a "+ccData.items[item].name+" for $"+ccData.items[item].price+"!\n";
			}
			web.chat.postMessage({ channel: conversationId, text: slackMessage })
				.then((res) => {

				})
				.catch(console.error);
			
			     console.log(message);
			});

    });

