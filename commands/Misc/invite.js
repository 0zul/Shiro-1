const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {

    var embed = new Discord.RichEmbed()
	.setColor(`${message.member.displayHexColor}`)
	.setTimestamp()
	.addField(`**${client.user.username}'s invite link:**`,`[**${client.user.username}/inv**](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
	message.channel.send({embed: embed}).then(message => {message.delete(25000)});
message.delete(10000);
}
module.exports.path = "../../commands/Misc/invite.js";
module.exports.help = {
    name: "invite"
}