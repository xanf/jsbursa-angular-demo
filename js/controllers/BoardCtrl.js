angular.module('midnightCoding').controller('BoardCtrl', [
  '$scope',
  '$routeParams',
  'tasksManager',
  'syncService',
  function ($scope, $routeParams, tasksManager, syncService) {

    $scope.tasks = [];


    syncService.connect($routeParams.id);
    syncService.onTaskUpserted(function (task) {
      $scope.$apply(function () {
        var existingTask = _.find($scope.tasks, { id: task.id });
        if (existingTask) {
          _.assign(existingTask, task);
        } else {
          $scope.tasks.push(task);
        }
      });
    });

    syncService.onTaskDeleted(function (taskId) {
      $scope.$apply(function () {
        _.remove($scope.tasks, { id: taskId });
      });
    });


    $scope.id = $routeParams.id;


    $scope.columns = [
      { title: 'Делать', status: 'todo', action: 'Начать делать' },
      { title: 'В работе', status: 'inprogress', action: 'Завершить', actionClass: 'btn-success' },
      { title: 'Готово', status: 'done'}
    ];

    tasksManager.getTasks($scope.id).then (function (tasks) {
      $scope.tasks = tasks;
    });

    $scope.taskRemove = function (task) {
      syncService.deleteTask(task.id);
      _.remove($scope.tasks, { id: task.id });
    };

    $scope.taskUpdate = function (task) {
      var currentStatusIndex = _.findIndex($scope.columns, { status: task.status });

      if (currentStatusIndex + 1 === $scope.columns.length) {
        throw new Error("Unable to move task");
      }

      var task = _.find($scope.tasks, { id: task.id });
      task.status = $scope.columns[currentStatusIndex + 1].status;
      syncService.upsertTask(task);
    };

  }]);



