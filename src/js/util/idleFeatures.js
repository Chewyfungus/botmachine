var path = require('path');
var file = require(path.join(__dirname, "file.js"));
var features = file.read(path.join(__dirname, "../config/idleFeatures.json"));

module.exports = function() {
    function getCommands() {
        console.log("I got to the function: ");
        var commands = [];
        for (var key in features) {
            console.log("key: " + key);
            if (features[key].commands) {
                var tempCommands = features[key].commands;
                console.log("tempCommands: " + tempCommands);
                for (var i in tempCommands) {
                    tempCommands[i]["action"] = features[key].action;
                    commands.push(tempCommands[i]);
                    console.log(i);
                }
            }
        }

        console.log ("the length of commands is " + commands.length + ", latest 1");
        console.log("I'm about to return commands: " + commands);
        return commands;
    }

    return { getCommands };
}();