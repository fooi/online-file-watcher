var fs = require('fs');
var path = require('path');
var express = require('express');
var createError = require('http-errors');
var router = express.Router();

var appfs = require('../app-fs');

function walk(folderPath, options) {
  if (!fs.existsSync(folderPath)) {}
  if (!fs.statSync(folderPath).isDirectory()) {}

  var opt = Object.assign({
    excludes: [],
    recursive: false,
    absolute: false,
    basePath: '',
  }, options);

  var directories = [];
  var files = [];

  fs.readdirSync(folderPath)
    .filter(itemName => opt.excludes.every(pattern => !pattern.test(itemName)))
    .forEach(itemName => {
      var itemPath = path.join(folderPath, itemName);
      var itemStats = fs.statSync(itemPath);
      if (itemStats.isDirectory()) {
        var itemDisplayPath = opt.absolute ? path.resolve(itemPath) : path.join(opt.basePath, itemName);
        directories.push(itemDisplayPath);
        if (opt.recursive) {
          var innerWalk = walk(itemPath, Object.assign({}, opt, {
            basePath: itemDisplayPath
          }));
          directories.push(innerWalk.directories);
          files.push(innerWalk.files);
        }
      } else if (itemStats.isFile()) {
        files.push(opt.absolute ? path.resolve(itemPath) : path.join(opt.basePath, itemName));
      }
    });

  return {
    id: folderPath,
    directories: directories,
    files: files,
  };
}

router.get(/\/(.*)/, function (req, res, next) {
  var targetPath = appfs.resolvePath(req.params[0]);
  if (fs.existsSync(targetPath)) {
    var targetStats = fs.statSync(targetPath);
    if (targetStats.isDirectory()) {
      res.json(walk(targetPath));
    } else if (targetStats.isFile()) {
      fs.createReadStream(targetPath, {
          encoding: 'utf-8'
        })
        .pipe(res);
    }
  } else {
    next(createError(400));
  }
});

module.exports = router;