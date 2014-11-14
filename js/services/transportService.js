angular.module('midnightCoding').factory('transportService', ['$q', 'appUrl', function ($q, appUrl) {
  var ws = null;

  function getSocket () {
    if (ws) {
      return $q.when(ws);
    }

    var deferred = $q.defer();
    ws = new WebSocket(appUrl.replace(/^http/, 'ws'));
    ws.onopen = function () {
      ws.onopen = null;
      ws.onerror = null;
      deferred.resolve(ws);
    };
    ws.onerror = function () {
      ws.onopen = null;
      ws.onerror = null;
      deferred.reject(ws);
    };

    return deferred.promise;
  }

  function sendMessage (message) {
    if (!message || !message.type) {
      throw new Error("Missing type");
    }

    var id = Math.random();

    getSocket().then(function (socket) {
      socket.send(JSON.stringify(_.assign({ id: id }, message)));
    });
  }


  function onMessage(fn) {
    getSocket().then(function (socket) {
      socket.onmessage = function (event) {
        fn(JSON.parse(event.data));
      }
    });
  }

  return {
    onMessage: onMessage,
    sendMessage: sendMessage

  }


}]);