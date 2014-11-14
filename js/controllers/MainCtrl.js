angular.module('midnightCoding').controller('MainCtrl', ['$scope', 'tasksManager', function ($scope, tasksManager) {

  $scope.columns = [
    { title: 'Делать', status: 'todo', action: 'Начать делать' },
    { title: 'В работе', status: 'inprogress', action: 'Завершить', actionClass: 'btn-success' },
    { title: 'Готово', status: 'done'}
  ];

  tasksManager.getTasks().then (function (tasks) {
    $scope.tasks = tasks;
  });

  $scope.taskRemove = function (task) {
    _.remove($scope.tasks, { id: task.id });
  };

  $scope.taskUpdate = function (task) {
    var currentStatusIndex = _.findIndex($scope.columns, { status: task.status });

    if (currentStatusIndex + 1 === $scope.columns.length) {
      throw new Error("Unable to move task");
    }

    _.find($scope.tasks, { id: task.id }).status = $scope.columns[currentStatusIndex + 1].status;
  };

}]);



