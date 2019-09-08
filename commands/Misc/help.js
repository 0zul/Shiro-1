const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {

    const RichEmbed = new Discord.RichEmbed()
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setTitle(`help for ${client.user.username}`)
    .addField('**Image commands: ['+ client.imageCommands.size +']**', '`'+client.imageCommands.map(c=>c.help.name).join('` `')+'`')
    .addField('**Misc commands: ['+ client.miscCommands.size +']**', '`'+client.miscCommands.map(c=>c.help.name).join('` `')+'`')
    .addField('**Moderation commands: ['+ client.moderationCommands.size +']**', '`'+client.moderationCommands.map(c=>c.help.name).join('` `')+'`')
    .addField('**XP commands: ['+ client.xpCommands.size +']**', '`'+client.xpCommands.map(c=>c.help.name).join('` `')+'`')
    .addField('**Music commands: ['+ client.musicCommands.size +']**', '`'+client.musicCommands.map(c=>c.help.name).join('` `')+'`')
    .setDescription(`here are my commands`)
    .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
    message.channel.send(RichEmbed);


}
module.exports.path = "../../commands/Misc/help.js";
module.exports.help = {
	name: "help",
	alias: "h",
	desc: "shows help to a user"
}
