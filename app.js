angular.module('midnightCoding', ['ngRoute'])
  .value('appUrl', 'http://jsbursa.wookieelabs.com:4600/tasks')
  .config([
    '$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/board/:id', {
          templateUrl: 'partials/board.html',
          controller: 'BoardCtrl'
        })
        .when('/', {
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl'
        })
    }
  ]);

