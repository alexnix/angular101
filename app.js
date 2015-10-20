var app = angular.module("app", []);

app.controller("MainCtrl", ['$scope', function($scope){

  $scope.tasks = [
    {name: 'Beer', completed: false},
    {name: 'Pizza', completed: true},
  ];

  $scope.check = function(task) {
    task.completed = true;
  };

  var removedTask = null;
  $scope.remove = function(task) {
    var index = $scope.tasks.indexOf(task);
    $scope.tasks.splice(index, 1);
    removedTask = task;
    $("div.undo-wrapper").fadeIn();
    setTimeout(function(){
      $("div.undo-wrapper").fadeOut();
    }, 4000)
  };

  $scope.undo = function() {
    if( removedTask ) {
      $scope.tasks.push(removedTask);
      removedTask = null;
    }
  };

  $scope.retake = function(task) {
    task.completed = false;
  };

  $scope.add = function() {
    $scope.tasks.push({
      completed: false,
      name: $scope.new_task_name,
    });
    $scope.new_task_name = null;
  };

}]);
