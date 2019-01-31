module.exports = {
    botCommand: function(msg) {
      console.log("inside botCommand");
      var command = msg.content.substr(1);
      switch (command) {
        case "goodnight":
          var tempRandom = Math.floor((Math.random() * 3) + 1);
          console.log(tempRandom);
          switch (tempRandom) {
            case 1:
              return("Good night, sweetie! :kissing_closed_eyes:");
              break;
            case 2:
              return("Sweet dreams, don't let the bed bugs bite!");
              break;
            case 3:
              return("Gnite :heart:");
              break;

            default:
              throw error;
          }
          break;
      }
    }
    //anotherFunction: goes(here){}
}
