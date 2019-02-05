module.exports = function() {
  function chooseAction(text, req, cb, functionUsed) {
    console.log("chooseAction called ")

    var functionObj = {
      sendMessage: function sendMessageTwo(text, req, cb) {
        return { sendMessage };
      },
      getPicture: function getPictureTwo(text, req, cb, params) {
        return { getPicture };
      }
    };

    getFunc(text, req, cb, functionUsed);

    function sendMessage(text, req, cb) {
      req.action = {
        "text": text
      };
      cb(null, req);
    }

    function getPicture(text, req, cb) {
      req.action = {
        "text": text
      }
      cb(null, req);
    }

    function getFunc(text, req, cb, functionUsed) {
      console.log("getFunc called with " + functionUsed);
      console.log(functionObj[functionUsed]);
      console.log(sendMessage);
      function funcMapKey() {
        getProperty(functionObj, functionUsed);
      }
      return funcMapKey(text, req, cb);
    }

  }
  return { chooseAction };
}();
