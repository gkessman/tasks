// server.js

// BASE SETUP
// =====================================================================================================================

var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var mongoose	= require('mongoose');

mongoose.connect('mongodb://namsek.info:27017/bear');
	
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// ====================================================================================================================

var api 	= require('./app/routes/api');
var router 	= require('./app/routes/web'); 

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use('/api', api);
app.use('/', router);

// START THE SERVER
// ====================================================================================================================
app.listen(port);
console.log('Server listening on port ' + port);