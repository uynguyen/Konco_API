/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var fs = require('fs');
var https = require('https');
var compression = require('compression');
var cfenv = require('cfenv');
var helmet = require('helmet');



// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(morgan("common"));
app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
app.use(cors());
app.use(compression());

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


app.get("/api", function(req, res) {
	res.json({status: "My API is alive!"});
});

app.get("/", function(req, res, next){
	res.sendFile("index.html");
});
var router = require('./routes');
app.use("/api", router);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

module.exports = app;