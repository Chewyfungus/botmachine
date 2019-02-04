var path = require('path');
var keys = require(path.join(__dirname, "../config/api_keys.json"));

module.exports = function() {
  function getPicture() {
    var test = new XMLHttpRequest();
    test.open('GET', keys.gelbooru, params);
    test.onload = function () {
    }
    test.send();
  }
  return { getPicture };
}
