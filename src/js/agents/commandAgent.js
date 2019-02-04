var path = require('path');
var dialogue = require(path.join(__dirname, "../config/dialogue.json"));

module.exports = function() {
    function interpret(req, cb) {

      //console.log();
      var prefix = "~";
      //var prefix = config.groups[req.client.group].agents.command.prefix;

      if (req.message[0] === prefix) {
        var command = req.message.slice(1);
        if (dialogue.hasOwnProperty(command)) {
          req.agent = {
            "action": "sendMessage",
            "params": {
              "messages": (getProperty(dialogue, command))
            }
          };
          cb(true, req);
        }
        cb(false);
      }
    }
    return { interpret };
}();

function getProperty(obj, prop) {
  return obj[prop];
}
