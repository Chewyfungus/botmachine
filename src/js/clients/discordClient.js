var Discord = require('discord.js');
var path = require("path")
var agentHub = require(path.join(__dirname, "../agents/agentHub.js"))
class DiscordClient {
  constructor(group, credentials) {
    this.group = group;
    this.discordClient = new Discord.Client();
    this.discordClient.login(credentials.token);
    this.discordClient.on("ready", () => {
    });

    this.discordClient.on("message", (msg) => {
      this.receiveMessage(msg);
    });

    console.log("Created Discord client for " + group);
  }

  receiveMessage(msg) {
    if (msg.author.bot) return;
    var botname = this.discordClient.user.username + "#" + this.discordClient.user.discriminator;
    var from = msg.author.username + "#" + msg.author.discriminator;
    var to = msg.isMentioned(this.discordClient.user) ? botname: undefined;
    var req = {
      "from": from,
      "to": to,
      "message": msg.content,
      "client": {
        "group": this.group,
        "channel": {
          "type": msg.channel.type
        },
        "type": "discord"
      }
    };

    try {
      agentHub.interpret(req, (err, res, cb) => {
        this.handleResponse(err, msg, res);
      });
    }
    catch (err) {
      console.log("Error caused by " + msg + ", " + err);
    }
  }

  handleResponse(err, msg, res) {
    if (err) {
      console.log(err);
      return;
    }
    if (res && res.action) {
      var message = res.action.text;
      var targetUser = msg && msg.author;
      var targetChannel = msg && msg.channel;

      if (targetChannel && (targetChannel.type === "text" || targetChannel.type === "dm")) {
        var userText = res.from ? "@" + res.from + " " : "";
        targetChannel.send(message);
        console.log("@@@@@@@@@@@@@@@@@@@@ yer dublin up girl");
      }
      else {
        console.log("invalid value for targetChannel.type or targetChannel does not exist");
      }

    }
    else {
      console.log("invalid value for targetChannel.type or targetChannel does not exist");
    }
  }
}

module.exports = DiscordClient;
