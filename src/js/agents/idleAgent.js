var path = require('path');
var features = require(path.join(__dirname, "../util/idleFeatures.js"));
var file = require(path.join(__dirname, "../util/file.js"));
var errorMessage = require(path.join(__dirname, "../util/error.js"));
var servers = file.read(path.join(__dirname, "../config/servers.json"));


module.exports = function() {
    function interpret(req, cb) {
        console.log(req.client.group);
        console.log(features.getCommands);
        req.message = req.message.slice(1);
        console.log(req.message);
        var commands = features.getCommands();
        var messageArray = []

        for (var i in commands) {
            console.log(commands[i].command);
            if (messageArray[0]  === commands[i].command) {
                var params = getParams(commands[i]);
                req.agent = {
                    "action": commands[i].action,
                    "params": params
                };
            console.log(params);
            cb(true, req); 
            return;
            }
          
        }

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
