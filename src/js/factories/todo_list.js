var factories = angular.module('factories');

factories.factory('TodoList', [function() {

	function TodoListInstance(data) {
		if (data === undefined) {
			data = {
				'name': 'New list',
				'tasks': []
			}
		}

        this.name = data.name;
        this.tasks = data.tasks;

        return this;
    }

    TodoListInstance.prototype.countTasks = function() {
    	return this.tasks.length;
    }

    TodoListInstance.prototype.allTasks = function() {
        return this.tasks;
    }

    TodoListInstance.prototype.addTask = function() {
    	var task = {
    		'description': 'New task',
    		'complete': false,
            'edit': true
    	};

    	this.tasks.push(task);
    }

    TodoListInstance.prototype.editTask = function(task) {
        task.edit = true;
    }

    TodoListInstance.prototype.saveTask = function(task) {
        task.edit = false;
    }

    TodoListInstance.prototype.removeTask = function(task) {
    	var index = this.tasks.indexOf(task);

		this.tasks.splice(index, 1);
    }

    return {
        create: function(data) {
            return new TodoListInstance(data);
        }
    };

}]);