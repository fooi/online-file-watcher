var path = require('path');

var HOST_FOLDER = path.resolve(__dirname, process.env.HOST_FOLDER || '.host')
var TEMP_FOLDER = path.join(__dirname, '.tmp');

function resolvePath(fileId) {
  return fileId ? path.join(HOST_FOLDER, fileId) : path.resolve(HOST_FOLDER);
}

module.exports.HOST_FOLDER = HOST_FOLDER;
module.exports.TEMP_FOLDER = TEMP_FOLDER;

module.exports.resolvePath = resolvePath;
