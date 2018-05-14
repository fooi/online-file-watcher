var fs = require('fs');
var path = require('path');
var events = require('events');

function getWatchThrottleDelay() {
  var delay = parseInt(process.env.THROTTLE_DELAY || '1000');
  if (delay <= 0) {
    delay = parseInt('1000');
  }
  return delay;
}

function FileWatcher(filePath) {
  if (!fs.statSync(filePath).isFile()) {
    throw 'Illegal argument exception: not a file';
  }

  var self = this;
  var watching = false;
  var emitter = new events.EventEmitter();

  var listener = function (curr, prev) {
    if (curr.mtime > prev.mtime) {
      fs.createReadStream(filePath, { start: prev.size })
        .on('data', function (chunk) {
          emitter.emit('file_delta', chunk);
        });
    }
  };

  this.getEmitter = function () {
    return emitter;
  }

  this.watch = function () {
    if (watching) {
      return self;
    }
    var options = {
      persistent: true,
      interval: getWatchThrottleDelay(),
    };
    fs.watchFile(filePath, options, listener);
    watching = true;
    return self;
  }

  this.unwatch = function () {
    if (!watching) {
      return self;
    }
    fs.unwatchFile(filePath, listener);
    watching = false;
    return self;
  }
}

module.exports = FileWatcher;
