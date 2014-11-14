angular.module('midnightCoding', []);

angular.module('midnightCoding').controller('MainCtrl', ['$scope', function ($scope) {
  $scope.tasks = JSON.parse('{"task5g962":{"title":"New task 1","description":"Kate","status":"todo"},"task1xr5l":{"title":"New task 3","description":"Kate","status":"todo"},"task5h4a7":{"title":"New task 4","description":"Kate","status":"todo"},"task25l2j":{"title":"New task 5","description":"Kate","status":"done"},"task32ke1":{"title":"New task 2","description":"Kate","status":"inprogress"}}');

  $scope.taskUpdate = function (task) {
    alert(task.id);
  }
}]);
