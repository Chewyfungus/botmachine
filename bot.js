var Discord = require('discord.js');
var cluster = require('cluster');
var express = require('express');
var path = require('path');
var file = require(path.join(__dirname, "src/js/util/file"));
var credentials = require(path.join(__dirname, "src/js/config/credentials.json"));
var port = process.env.PORT || 9001;
var prefix = "~";
var http = require("http");

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

  var discordClient = new Discord.Client();
  console.log(credentials.token);
  discordClient.login(credentials.token);
  discordClient.on("ready", () => {
  });

  discordClient.on("message", (msg) => {
    receiveMessage(msg);
  });

}

function receiveMessage(msg) {
  if (msg.author.bot) return;
  var botname = discordClient.user.username + "#" + discordClient.user.discriminator;
  var from = msg.author.username + "#" + msg.author.discriminator;
  var to = msg.isMentioned(discordClient.user) ? botname: undefined;
  var targetChannel = (msg && msg.channel); // ||

  if (msg.content[0] === prefix) {
    var command = msg.content.substr(1);
    if (command === "tuckmein") {
      targetChannel.send("Good night.")
    }
  }

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
