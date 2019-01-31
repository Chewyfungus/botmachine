const fs = require('fs');

module.exports = function() {
    function read(path) {
        var rawData = fs.readFileSync(path);
        if (path.indexOf('.json') !== -1) {
            return JSON.parse(rawData);
        }
        else {
            return rawData;
        }
    }

    return { read };
}();
