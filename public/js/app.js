var app = angular.module('app', ['ngRoute', 'todoController', 'todoService']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

	$httpProvider.defaults.useXDomain = true;

	$routeProvider
	.when('/', {
		templateUrl: "partials/tasks.html",
		controller: "TodoController"
	})
	.when('/login', {
		templateUrl: "partials/login.html"
	})
	.when('/register', {
		templateUrl: "partials/register.html"
	})
	.otherwise({
		redirectTo: '/'
	})
}]);