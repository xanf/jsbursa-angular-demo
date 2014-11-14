angular.module('midnightCoding').directive('task', [ function () {
  return {
    restrict: 'A',
    templateUrl: 'js/directives/task/task.html',
    controller: function ($scope) {
      $scope.process = function () {
        $scope.onUpdate($scope.task);
      };

      $scope.remove = function () {
        $scope.onRemove($scope.task);
      };
    },
    scope: {
      task: '=',
      onUpdate: '=',
      onRemove: '=',
      actionText: '@',
      actionClass: '@'
    }
  }
}]);
