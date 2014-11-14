angular.module('midnightCoding').factory('syncService', ['transportService', function (transportService) {
  var connected = false;
  var upsertFn = null;
  var deleteFn = null;

  function _handleMessage(message) {
    if (message.type === 'upsert' && upsertFn) {
      task = _.assign(_.clone(message), { id: message.taskId });
      delete task.taskId;

      upsertFn(task);
    }

    if (message.type === 'delete' && deleteFn) {
      deleteFn(message.taskId);
    }
  }

  function connect (name) {
    transportService.sendMessage({ type: 'connect', name: name });
    transportService.onMessage(_handleMessage);
    connected = true;
  }

  function deleteTask (taskId) {
    if (!connected) {
      throw new Error("You are not connected");
    }

    return transportService.sendMessage({ type: 'delete', taskId: taskId });
  }

  function upsertTask (task) {
    if (!connected) {
      throw new Error("You are not connected");
    }

    var message = _.clone(task);

    message.taskId = message.id;
    message.type = 'upsert';
    delete message.id;

    return transportService.sendMessage(message);
  }


  function onTaskUpserted (fn) {
    upsertFn = fn;
  }

  function onTaskDeleted (fn) {
    deleteFn = fn;
  }


  return {
    connect: connect,
    deleteTask: deleteTask,
    upsertTask: upsertTask,
    onTaskUpserted: onTaskUpserted,
    onTaskDeleted: onTaskDeleted
  };


}]);