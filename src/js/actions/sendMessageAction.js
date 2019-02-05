var path = require("path");
var action = require(path.join(__dirname, "action"));
module.exports = function() {
  function run(req, cb) {
    var params = req.agent.params;

    if (params && params.messages) {
      var rand = Math.floor((Math.random() * params.messages.length));
      console.log("Random value: " + rand);
      console.log(params.messages[rand] + ", " + req + ", " + cb + ", ")
      action.chooseAction(params.messages[rand], req, cb, params, "sendMessage");
    }

    else {
      // action.sendMessage("Oh, goodness, I don't know if I can do *that*...", req, cb)
      // console.log("Invalid command issued");
    }
  }

  return { run };

}();
