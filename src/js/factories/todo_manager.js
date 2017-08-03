var factories = angular.module('factories');

factories.factory('TodoManager', ['TodoList', function(TodoList) {

	TodoManager = {};

	TodoManager.lists = [];

	TodoManager.all = function() {
		return this.lists;
	}

	TodoManager.load = function(lists) {
		return this.lists = lists;
	}

	TodoManager.add = function() {
		var list = TodoList.create();

		this.lists.push(list);
	}

	TodoManager.remove = function(list) {
		var index = this.lists.indexOf(list);

		this.lists.splice(index, 1);
	}

	TodoManager.listsCount = function() {
		return this.lists.length;
	}

	return TodoManager;

}]);