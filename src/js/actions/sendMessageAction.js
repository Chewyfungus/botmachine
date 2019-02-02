var path = require("path");
var action = require(path.join(__dirname, "action"));
module.exports = function() {
  function run(req, cb) {
    var params = req.agent.params;

    if (params && params.messages) {
      var rand = Math.floor((Math.random() * params.messages.length) + 1);
      action.sendMessage(params.messages[rand], req, cb);
    }

    else {
      action.sendMessage("Oh, goodness, I don't know how to do *that*...", req, cb)
      console.log("Invalid command issued");
    }
  }

  return { run };

}();
