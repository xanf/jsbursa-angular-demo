angular.module('midnightCoding').controller('HomeCtrl', ['$scope', '$location', function ($scope, $location) {
  $scope.start = function () {
    var hash = (~~(Math.random() * 1000000)).toString(36);
    $location.path('/board/' + hash);
  }

}]);



