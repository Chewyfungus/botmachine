// Once an event has been triggered and the req object 
//   has been passed to agentHub.interpret,
//   it loops through through each agent for that event.
//   This is done through the matchAgent function, which recursively
//   iterates through and attempts to match an agent (a replyAgent in this case).
// If a replyAgent that matches is found, req is transformed and passed to actionHub.run,
//   

var path = require("path");
var actionHub = require(path.join(__dirname, "../actions/actionHub"));
var commandAgent = require(path.join(__dirname, "../agents/commandAgent"));
var idleAgent = require(path.join(__dirname, "../agents/idleAgent"));

module.exports = function() {
  var replyAgents = [
    commandAgent,
    idleAgent
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
          cb(res);
        }
        else {
          matchAgent(list, req, cb, ++i);
        }
      });
    }
  }
  return { interpret };
}();
