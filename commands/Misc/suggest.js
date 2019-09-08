let discord = require("discord.js");

module.exports = {
     path: "../../commands/Misc/suggest.js",
     help: {
          name: "suggest",
          aliases: ["sug"]
     },
     run: async (client,message) => {
              let a =  message.content.replace( /  +/g," ").split(" ").slice(1).join(" ");
              let name = a.split("|")[0];
              let suggestion = a.split("|").slice(1).join(" ");
               let channel = message.guild.channels.find(c => c.name == "suggestions" && c.type == "text");

               let embed = new discord.RichEmbed()
               .setTitle("Suggestion imbound")
               .setColor(message.member.displayHexColor ? message.member.displayHexColor : "#000000")
               .addField(name, suggestion)
               .setFooter(`by: ${message.member.displayName}`, message.member.displayAvatarURL)
               channel.send(embed);
     }
}