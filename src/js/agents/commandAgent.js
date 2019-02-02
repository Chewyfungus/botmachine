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
              "messages": [
                "Good night, sweetie! :kissing_closed_eyes:",
                "Sweet dreams, don't let the bed bugs bite!",
                "Gnite :heart:"
              ]
            }
          };
          cb(true, req);
        }
        cb(false);
      }
    }
    return { interpret };
}();
