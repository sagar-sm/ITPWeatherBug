/*
	requires:
		* node.js (http://nodejs.org/)
		* express.js (http://expressjs.com/)
		* socket.io (http://socket.io/#how-to-use)
		* serialport.js (https://github.com/voodootikigod/node-serialport)
		
	based on the core examples for socket.io and serialport.js
	created 25 Feb 2014.
	
*/


var serialport = require("serialport"),		
	SerialPort  = serialport.SerialPort,
	express = require('express'),		
	open = require('open'),             
	url = 'http://localhost:8080';      

var app = express(),								  
   server = require('http').createServer(app);		

// configure server to serve static files from /js:
app.use('/js', express.static(__dirname + '/js'));
app.use('/gridster', express.static(__dirname + '/gridster'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
 
// third word of the command line is serial port name:
var portName = process.argv[2];				  
// print out the port you're listening on:
console.log("opening serial port: " + portName);	

// listen for incoming requests on the server:
server.listen(8080);								         
console.log("Listening for new clients on port 8080");
// open the app in a browser:
open(url);                   

// open the serial port. Uses the command line parameter:
var myPort = new SerialPort(portName, { 
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n") 
});

/* The rest of the functions are event-driven. 
   They only get called when the server gets incoming GET requests:
*/

// respond to web GET requests with the index.html page:
app.get('/', function (request, response) {
  response.sendfile(__dirname + '/index.html');
});


var feedback = new Array();
feedback[0] = 0;
feedback[1] = 0;
feedback[2] = 0;
app.get('/vote/*', function (request, response) {
  var options = request.params[0];  
  console.log(options);
  feedback[options]++;
  var winner = feedback.indexOf(Math.max.apply(Math,feedback));

  console.log("winner "+ winner);

  myPort.write(winner.toString());

  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(feedback.toString());
});
