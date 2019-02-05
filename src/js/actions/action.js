module.exports = function() {
  function sendMessage(text, req, cb) {
    req.action = {
      "text": text
    };
    cb(null, req);
  }
  return { sendMessage };
}();
