let discord = require("discord.js");

module.exports = {
     path: "../../commands/Misc/regextest.js",
     help: {
          name: "regextest",
          alias: "regex"
     },
     run: async (client,message) => {
              		  let regex = message.content.split(" | ")[0];
	      		  let match = message.content.split(" | ")[1].match(regex);
              		  let i = 0;
			  if(match){
					let embed = new discord.RichEmbed()
					.setTitle("Regex Match")
					.setColor("#00ff00")
					.addField("Regex:",regex)
					.addField("Input:",match.input)
					match.slice(1,match.length-2).forEach(m => embed.addField(`Group ${++i}`,m))
					.setFooter(`by: ${message.member.displayName}`, message.member.displayAvatarURL)
					message.channel.send(embed);
			   } else {
					let eembed = new discord.RichEmbed()
					.setTitle("No Match")
					.setColor("#ff0000")
					.addField("Regex:",regex)
					.addField("Input:",message.content.split(" | ")[1])
					.setFooter(`by: ${message.member.displayName}`, message.member.displayAvatarURL)
					message.channel.send(eembed);
			   }
     }
}
