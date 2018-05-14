var fs = require('fs');
var path = require('path');
var express = require('express');
var createError = require('http-errors');
var router = express.Router();

var appfs = require('../app-fs');

/* GET home page. */
router.get(/\/(.*)/, function(req, res, next) {
  var targetPath = appfs.resolvePath(req.params[0]);
  if (fs.existsSync(targetPath)) {
    var targetStats = fs.statSync(targetPath);
    if (targetStats.isDirectory()) {
      var directories = [];
      var files = [];
      fs.readdirSync(targetPath).forEach(function (subTarget) {
        var subTargetStats = fs.statSync(path.join(targetPath, subTarget));
        if (subTargetStats.isDirectory()) {
          directories.push(subTarget);
        } else if (subTargetStats.isFile()) {
          files.push(subTarget);
        }
      });
      res.json({
        directories: directories,
        files: files,
      });
    } else if (targetStats.isFile()) {
      countLines(targetPath).then(function (lineCount) {
        var options = {
          headers: {
            'Content-Lines': lineCount
          },
          dotfiles: 'allow',
        };
        res.sendFile(targetPath, options, function (err) {
          if (err) {
            next(err);
          }
        });
      });
    }
  } else {
    next(createError(400));
  }
});

/**
 * Count number of lines of a file.
 */

function countLines(filePath) {
  return new Promise(function (resolve, reject) {
    var i;
    var count = 1;
    fs.createReadStream(filePath)
      .on('data', function (chunk) {
        for (i = 0; i < chunk.length; i++) {
          if (chunk[i] == 10) {
            count++;
          }
        }
      })
      .on('end', function () {
        resolve(count);
      });
  });
}

module.exports = router;
