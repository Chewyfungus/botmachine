var path = require('path');
var features = require(path.join(__dirname, "../util/features"));
var file = require(path.join(__dirname, "../util/file.js"));
var errorMessage = require(path.join(__dirname, "../util/error.js"));
var servers = file.read(path.join(__dirname, "../config/servers.json"));


module.exports = function() {
    function interpret(req, cb) {

      console.log(req.client.group);
      var prefix = servers.groups[req.client.group].agents.command.prefix;
      console.log(features.getCommands);
      if (req.message[0] === prefix) {
        console.log("this will work if matched");
        req.message = req.message.slice(1);
        var messageArray = req.message.split(" ");
        console.log(req.message);
        var commands = features.getCommands();
        var errorFlag = true;

        for (var i in commands) {
          console.log(commands[i].command);
          if (messageArray[0]  === commands[i].command) {
            var params = getParams(commands[i]);
            req.agent = {
              "action": commands[i].action,
              "params": params
            };
            console.log(params);
            errorFlag = false;
            cb(true, req); 
            return;
          }
          
        }

        if (errorFlag === true) {
          console.log("Unknown command: " + req.message);
          var randError = errorMessage.randomError();
          console.log(randError);
          req.agent = {
            "action": "sendMessage",
            "params": {
              "messages": [ randError ]
            }
          };
          cb(true, req);
          return;
        }
        
      }

      cb(false);
    }

    function getParams(command) {
      var result = {};
      if (!command) {
        return undefined;
      }
      if (command.constants) {
        for (var i in command.constants) {
          result[command.constants[i].name] = command.constants[i].value;
        }
      }
      return result;
    }

    return { interpret };
}();
//
// function getProperty(obj, prop) {
//   return obj[prop];
// }
