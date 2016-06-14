var express = require('express');
var Todo = require('../models/todos');

// api routes ==========================================================
module.exports = (function() {
	'use strict';
	var api = express.Router(); // get an instance of the express Router

	api.get('/', function(req, res) {
		res.json({ message: 'Root API endpoint' });
	});

	api.route('/todos')

	// create a todo (accessed at POST http://localhost:8080/api/todos)
	.post(function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text: req.body.text,
			done: false
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	})

	// get list of current todos in data store
	.get(function(req, res) {
		Todo.find(function(err, todos) {
			if (err)
				res.send(err);
			res.json(todos);
		});
	});

	api.route('/todos/:todo_id')

	// get the todo with that id
	.get(function(req, res) {
		Todo.findById(req.params.todo_id, function(err, todo) {
			if (err)
				res.send(err);
			res.json(todo);
		});
	})

	.put(function(req, res) {
		Todo.findById(req.params.todo_id, function(err, todo) {
			if (err)
				res.send(err);
			todo.name = req.body.name;

			todo.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'Todo updated!' });
			});
		});
	})

	.delete(function(req, res) {
		Todo.remove({
			_id: req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			})
		});
	});

	return api;
})();