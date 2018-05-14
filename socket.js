var path = require('path');
var Server = require('socket.io');
var textDecoder = new (require('util').TextDecoder)('utf-8');

var FileWatcher = require('./file-watcher');
var appfs = require('./app-fs');

function decode(input, options) {
  return textDecoder.decode(input, options);
}

var file2Watcher = {};
var file2Sockets = {};

function watchFile(fileId, socket) {
  if (file2Sockets[fileId] && file2Sockets[fileId].length > 0) {
    file2Sockets[fileId].push(socket);
  } else {
    var filePath = appfs.resolvePath(fileId);
    var watcher = file2Watcher[fileId] || new FileWatcher(filePath);
    watcher.watch().getEmitter().addListener('file_delta', function (chunk) {
      socket.server.to(fileId).emit('file_delta', decode(chunk));
    });
    file2Watcher[fileId] = watcher;
    file2Sockets[fileId] = [socket];
    console.log('watch: ' + fileId);
  }
}

function unwatchFile(fileId, socket) {
  var index;
  if (file2Sockets[fileId] && (index = file2Sockets[fileId].indexOf(socket)) != -1) {
    file2Sockets[fileId].splice(index, 1);
    if (file2Sockets[fileId].length == 0) {
      file2Watcher[fileId].unwatch();
      delete file2Watcher[fileId];
      delete file2Sockets[fileId];
      console.log('unwatch: ' + fileId);
    }
  }
}

function socketUnwatchAll(socket) {
  for (var fileId in file2Sockets) {
    if (!file2Sockets.hasOwnProperty(fileId)) {
      continue;
    }
    unwatchFile(fileId, socket);
  }
}

function createSocketServer() {
  var io = new Server(...arguments);

  io.on('connection', function (socket) {

    socket.on('watch_file', function (fileId) {
      socket.join(fileId, function (err) {
        if (err) {
          throw err;
        }
        watchFile(fileId, socket);
      });
    });

    socket.on('unwatch_file', function (fileId) {
      socket.leave(fileId, function (err) {
        if (err) {
          throw err;
        }
        unwatchFile(fileId, socket);
      });
    });

    socket.on('disconnect', function () {
      socketUnwatchAll(socket);
    });

  });

  return io;
}

module.exports = createSocketServer;
