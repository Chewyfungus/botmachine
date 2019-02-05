var path = require('path');
var keys = require(path.join(__dirname, "../config/api_keys.json"));

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
