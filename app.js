var app = angular.module("app", []);

app.service("Tasks", [function(){
  return {
    tasks: [
      {name: 'Beer', completed: false},
      {name: 'Pizza', completed: true},
    ],
    removedTask: null,

    getTasks: function() {
      return this.tasks;
    },

    remove: function(task) {
      var index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
      this.removedTask = task;
      return true;
    },

    undo: function() {
      if( this.removedTask ) {
        this.tasks.push(this.removedTask);
        this.removedTask = null;
      }
    },

    retake: function(task) {
      task.completed = false;
    },

    add: function(new_task_name) {
      if( new_task_name ) {
        this.tasks.push({
          completed: false,
          name: new_task_name,
        });
        return true;
      }
    }
  };
}]);

app.controller("MainCtrl", ['$scope', "Tasks", function($scope, Tasks){

  $scope.tasks = Tasks.getTasks();

  $scope.check = function(task) {
    task.completed = true;
  };

  var removedTask = null;
  $scope.remove = function(task) {
    if (Tasks.remove(task)) {
      $("div.undo-wrapper").fadeIn();
      setTimeout(function(){
        $("div.undo-wrapper").fadeOut();
      }, 4000);
    }
  };

  $scope.undo = function() {
    Tasks.undo();
  };

  $scope.retake = function(task) {
    Tasks.retake(task);
  };

  $scope.add = function() {
    if (Tasks.add($scope.new_task_name))
      $scope.new_task_name = null;
  };

}]);
