var express = require('express');
var Bear = require('../models/bear');

// ROUTES FOR OUR API
// ====================================================================================================================

// middleware to use for all requests
// router.use(function(req, res, next) {
// 	console.log('something is happening.');
// 	next();
// });

module.exports = (function() {
	'use strict';
	var api = express.Router(); // get an instance of the express Router

	api.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });
	});

	api.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {

		var bear = new Bear(); // creates a new instance of a Bear model
		bear.name = req.body.name; // set the bear's name (comes from request)
		console.log('bear name! ' + bear.name);

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({
				message: 'Bear created!'
			});
		})
	})

	// get list of current bears in data store
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});

	});

	api.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			bear.name = req.body.name;

			bear.save(function(err) {
				if (err)
					res.send(err);
				res.json({
					message: 'Bear updated!'
				});
			});
		});
	})

	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({
				message: 'Successfully deleted'
			});
		});
	});

	return api;
})();