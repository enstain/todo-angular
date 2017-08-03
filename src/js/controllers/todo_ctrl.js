var controllers = angular.module('controllers');

controllers.controller('TodoController', function TodoController($scope, TodoManager) {

	$scope.todoManager = TodoManager;

});