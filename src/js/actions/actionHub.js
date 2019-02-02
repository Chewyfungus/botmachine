var path = require("path");
var sendMessageAction = require(path.join(__dirname, "sendMessageAction"));
module.exports = function() {
  var actionMap = {
    "sendMessage": sendMessageAction
  }

  function run(req, cb) {
    var action;
    if (req && req.agent) {
      action = actionMap[req.agent.action];
      if (!action) {
        //action = defaultAction;
        console.log("Action has not been specified by the agent");
      }
    }
    else {
      //To do: Add default action
      console.log("Agent has not been specified");
    }
    try {
      action.run(req, cb);
    }
    catch(err) {
      console.log(err);
    }
  }
  return { run };
}();
