describe('TodoList', function () {
  
  var $todoManager;

  beforeEach(function() {
    module('todoApp');

    inject(function(TodoList){
      $todoList = TodoList.create();
    });    
  });

  it('should have name by default', function () {
    expect($todoList.name).equal('New list');
  });

  it('should have no tasks on start', function () {
    expect($todoList.countTasks()).equal(0);
  });

  it('should have new task after add', function () {
    $todoList.addTask();

    expect($todoList.countTasks()).equal(1);
  });

  it('should have less tasks after remove', function () {
    var task = {
      'description': 'Another task',
      'complete': true
    };

    $todoList.addTask(task);

    expect($todoList.countTasks()).equal(1);

    $todoList.removeTask(task);

    expect($todoList.countTasks()).equal(0);
  });

});