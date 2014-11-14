angular.module('midnightCoding').factory('tasksManager', ['$http', 'appUrl', function ($http, appUrl) {


  function getTasks (id) {
    id = id || 'demo';

    return $http.get(appUrl + '?id=' + id).then(function (response) {
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