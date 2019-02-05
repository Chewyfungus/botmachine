var path = require('path');
var file = require(path.join(__dirname, "../util/file.js"))
var keys = file.read(path.join(__dirname, "../config/api_keys.json"));

module.exports = function() {
  function run() {
    var test = new XMLHttpRequest();
    test.open('GET', keys.gelbooru, req, cb);
    test.onload = function () {
    }
    test.send();
  }
  return { run };
}

// function getPicture(text, req, cb) {
//   req.action = {
//     "text": text
//   }
//   cb(null, req);
// }
