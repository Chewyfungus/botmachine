var path = require('path');
var dialogue = require(path.join(__dirname, "../config/dialogue.json"));

module.exports = function() {
    function interpret(req, cb) {

      //console.log();
      var prefix = "~";
      //var prefix = config.groups[req.client.group].agents.command.prefix;

      if (req.message[0] === prefix) {
        var command = req.message.slice(1);
        if (command === "goodnight") {
          req.agent = {
            "action": "sendMessage",
            "params": {
              "messages": dialogue.goodnight
            }
          };
          cb(true, req);
        }
        cb(false);
      }
    }
    return { interpret };
}();
