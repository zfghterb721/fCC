var http = require('http');
var socket = require('socket.io');
var dateFormat = require('dateformat');
const { WebClient } = require('@slack/client');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');
var doc = new GoogleSpreadsheet(process.env.DOC_TOKEN);
require('dotenv').config()

// An access token (from your Slack app or custom integration - xoxp, xoxb, or xoxa)
const token = process.env.SLACK_TOKEN;
console.log(token);

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'CAWHPJ5DK';


function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}

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
			var now = new Date();
			ccData = JSON.parse(message);
			console.log(ccData);
			var slackMessage = "";
			for (item in ccData.items){
				slackMessage += "Someone bought a "+ccData.items[item].name+" for $"+ccData.items[item].price+"!\n";
				doc.useServiceAccountAuth(creds, function (err) {
					doc.addRow(1, extend(ccData.items[item],{time:dateFormat(now, "m/dd/yyyy H:MM:ss")}), function(err) {
						if(err) {
							console.log(err);
						}
					});
				});
			}
			for (item in ccData.buyitems){
				slackMessage += "Someone sold a "+ccData.items[item].name+" for $"+ccData.items[item].price+"!\n";
				doc.useServiceAccountAuth(creds, function (err) {
					doc.addRow(3, extend(ccData.items[item],{time:dateFormat(now, "m/dd/yyyy H:MM:ss")}), function(err) {
						if(err) {
							console.log(err);
						}
					});
				});
			}
			for (item in ccData.orders){
				doc.useServiceAccountAuth(creds, function (err) {
					doc.addRow(2, extend(ccData.orders[item],{time:dateFormat(now, "m/dd/yyyy H:MM:ss")}), function(err) {
						if(err) {
							console.log(err);
						}
					});
				});
			}
			for (item in ccData.buyorders){
				doc.useServiceAccountAuth(creds, function (err) {
					doc.addRow(4, extend(ccData.orders[item],{time:dateFormat(now, "m/dd/yyyy H:MM:ss")}), function(err) {
						if(err) {
							console.log(err);
						}
					});
				});
			}
			web.chat.postMessage({ channel: conversationId, text: slackMessage })
				.then((res) => {

				})
				.catch(console.error);
			});

    });

