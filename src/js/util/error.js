var path = require('path');
var math = require(path.join(__dirname, "math.js"));

module.exports = function() {
    var errors = [
        "Oh, I don't know how to do *that*...",
        "What? :thinking:",
        "I'm not quite sure what you mean :flushed:"
    ]
    
    function randomError() {
        return errors[math.randomInt(0, errors.length - 1)];
    }

    return { randomError };
}();