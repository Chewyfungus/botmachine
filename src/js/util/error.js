var path = require('path');
var math = require(path.join(__dirname, "math.js"));

module.exports = function() {
    var errors = [
        "Oh, I don't know how to do *that*..."
    ]
    
    function randomError() {
        // return errors[math.randomInt(0, errors.length - 1)];
        return errors;
    }

    return { randomError };
}();