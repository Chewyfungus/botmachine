module.exports = function() {
  function sendMessage(text, req, cb, params) {
    req.action = {
      "text": text
    };
    cb(null, req);
  }

  return { sendMessage };
}();
