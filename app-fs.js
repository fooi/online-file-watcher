var path = require('path');

var STREAM_FOLDER = path.resolve(__dirname, process.env.STREAM_FOLDER || '.streams')
var TEMP_FOLDER = path.join(__dirname, '.tmp');

function resolvePath(fileId) {
  if (fileId) {
    if (fileId === 'RUNTIME_COUNTER') {
      return path.join(TEMP_FOLDER, '.runtime-counter');
    } else {
      return path.join(STREAM_FOLDER, fileId);
    }
  }
  return STREAM_FOLDER;
}

module.exports.STREAM_FOLDER = STREAM_FOLDER;
module.exports.TEMP_FOLDER = TEMP_FOLDER;

module.exports.resolvePath = resolvePath;
