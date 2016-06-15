// js/controller/main.js
angular.module('todoController', [])

// inject the Todo service factory into our controller
.controller('mainController', function($scope, $http, Todos) {
	$scope.formData = {};

	// GET ===================================================
	Todos.get()
		.success(function(data) {
			console.log(data);
			$scope.timestamp(data);
			$scope.todos = data;
		});

	// CREATE ================================================
	$scope.createTodo = function() {

		// validate the form data to make sure something is there
		// if form is empty, nothing with happen
		if (!$.isEmptyObject($scope.formData)) {
			// call the function from our service (returns a promise object)
			Todos.create($scope.formData)
				.success(function(data) {
					$scope.formData = {};
					$scope.timestamp(data);
					$scope.todos = data;
				});
		}
	};

	// DELETE ================================================
	// delete todo after checking it
	$scope.deleteTodo = function(id) {
		Todos.delete(id)
			.success(function(data) {
				$scope.timestamp(data);
				$scope.todos = data;
			});
	};

	// MODIFY TIMESTAMP ======================================
	$scope.timestamp = function(data) {
		$.each(data, function(i, v) {
			var t = new Date(v.time);
			v.time = t.getMonth() + 1 + '/' + t.getDate() + '/' + t.getFullYear();
		});

		return data;
	}
});