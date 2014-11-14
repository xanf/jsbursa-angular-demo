angular.module('midnightCoding').factory('tasksManager', ['$http', function ($http) {
  var URL = 'http://jsbursa.wookieelabs.com:4600/tasks?id=';


  function getTasks (id) {
    id = id || 'demo';

    return $http.get(URL + id).then(function (response) {
      var results = [];
      _.each(response.data, function (task, taskId) {
        task.id = taskId;
        results.push(task);
      });

      return results;
    });
  }

  return {
    getTasks: getTasks
  }

}]);