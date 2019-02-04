var path = require("path");
var actionHub = require(path.join(__dirname, "../actions/actionHub"));
var commandAgent = require(path.join(__dirname, "../agents/commandAgent"));
module.exports = function() {
  var replyAgents = [
    commandAgent
  ];
  function interpret(req, cb) {
    try {
      matchAgent(replyAgents, req, (res) => {
        actionHub.run(res, cb)
      });
    }
    catch(err) {
      actionHub.run(req, cb);
      console.log(err);
    }
  }

  function matchAgent(list, req, cb, i = 0) {
    console.log(list[i]);
    if (i < list.length) {
      list[i].interpret(req, (match, res, err) => {
        if (err) {
          console.log("Error: unable to interpret message " + res.message);
          matchAgent(list, req, cb, ++i);
        }
        else if (match) {
          console.log("else if meme");
          cb(res);
        }
        else {
          matchAgent(list, req, cb, ++i);
        }
      });
    }
    // else {
    //   cb(req);
    //   console.log("raw else wtf");
    // }
  }
  return { interpret };
}();
