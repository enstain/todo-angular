describe('TodoManager', function () {
  
  var $todoManager;

  beforeEach(function() {
    module('todoApp');

    inject(function(TodoManager){
      $todoManager = TodoManager;
    });    
  });

  it('should have empty todo lists on start', function () {
    expect($todoManager.listsCount()).equal(0);
  });

  it('should have more lists after add', function () {
    var count = $todoManager.listsCount();

    $todoManager.add();

    var newCount = $todoManager.listsCount();
    
    expect(newCount).equal(count + 1);
  });

  it('should have less lists after remove', function () {
    var list = {};

    $todoManager.load([list]);

    var count = $todoManager.listsCount();

    $todoManager.remove(list);

    var newCount = $todoManager.listsCount();
    
    expect(newCount).equal(count - 1);
  });

});