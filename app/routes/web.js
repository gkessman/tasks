var express		= require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();
	
	router.get('/', function(req, res) {
		res.redirect('/index.html');
	});

	return router;
})();