// server.js
'use strict';

// set up ==========================================================
var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');
var mongoose	= require('mongoose');
var morgan		= require('morgan');
var database	= require('./config/database');
var port = process.env.PORT || 8080;

// configuration ==================================================
mongoose.connect(database.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// routes =========================================================
var api 	= require('./app/routes/api');
var router 	= require('./app/routes/web'); 

// register routes ================================================
app.use('/api', api);
app.use('/', router);

// server listen ==================================================
app.listen(port);
console.log('App listening on port ' + port);