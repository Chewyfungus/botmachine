var cluster = require('cluster');
var express = require('express');
var path = require('path');
var file = require(path.join(__dirname, "src/js/util/file"));
var botCommands = require(path.join(__dirname, "commands.js"));
var credentials = require(path.join(__dirname, "src/js/config/credentials.json"));
var port = process.env.PORT || 9001;
var prefix = "~";
var http = require("http");
var discordClient = require(path.join(__dirname, "src/js/clients/discordClient.js"))

if (cluster.isMaster) {
  console.log("starting master OwO");
  cluster.fork();

  cluster.on("exit", (worker) => {
    console.log("worker " + worker.id + " died");
    cluster.fork();
  })
}

else {
  //make da server
  var app = express();
  var server, options;
  //try {options = }
  server = http.createServer(app);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
  app.set("port", port);
  //app.get();

  var discordClient = new discordClient("gang gang", credentials);
}

function receiveMessage(msg) {
  if (msg.author.bot) return;
  var botname = discordClient.user.username + "#" + discordClient.user.discriminator;
  var from = msg.author.username + "#" + msg.author.discriminator;
  var to = msg.isMentioned(discordClient.user) ? botname: undefined;
  var targetChannel = (msg && msg.channel); // ||

  // if (msg.content[0] === prefix) {
  //   //botCommands.botCommand(msg);
  //   targetChannel.send(botCommands.botCommand(msg));
  //
  // }

}

function onError(error) {
  console.error(error);
  if(error.syscall !== "listen") throw error;
  var bind = typeof port === "string" ? "Pipe " + port :  "Port " + port;

  switch(error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;

    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;

    case "ECONNRESET":
      console.error(bind + " connection has been reset.");
      process.exit(1);
      break;

    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof port === "string" ? "Pipe " + port :  "Port " + port;
  console.log("listening on " + bind);
}
