const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
let sum1 = message.content.split(' ').slice(1,2).join(' ');
if(sum1.toLowerCase()==="avatar")sum1 = message.content.split(' ').slice(2,3).join(' ');

let ppl = message.mentions.users.find(u => u.id !== client.user.id)||client.users.get(sum1);
let oof = message.mentions.members.find(m => m.user.id !== client.user.id)||message.guild.members.get(sum1)||message.member;

if(!sum1||sum1.toLowerCase() === "avatar"){
let link = message.author.displayAvatarURL.includes('gif') ? `${message.author.displayAvatarURL}?size=2048` : message.author.displayAvatarURL;
		var RichEmbed = new Discord.RichEmbed()
   .setDescription(`**Avatar for:** ${message.author.username}\n[link](${link})`)
   .setColor(`${oof.displayHexColor ? oof.displayHexColor : "#000000"}`)
	 .setTimestamp()
	 .setImage(`${link}`)
	 .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.displayAvatarURL}`)
	 await message.channel.send({embed: RichEmbed})
} else {
client.fetchUser(!ppl ? sum1 : ppl.id).then(async user => {
let link = user.displayAvatarURL.includes('gif') ? `${user.displayAvatarURL}?size=2048` : user.displayAvatarURL;

		var RichEmbed = new Discord.RichEmbed()
   .setDescription(`**Avatar for:** ${user.username}\n[link](${link})`)
   .setColor(`${oof.displayHexColor ? oof.displayHexColor : "#000000"}`)
	 .setTimestamp()
	 .setImage(`${link}`)
	 .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.displayAvatarURL}`)
	 await message.channel.send({embed: RichEmbed})
}).catch(err => {
if(err)return message.channel.send('``Error: Unknown User``\nThis error has occurred because you either copied the user\'s id wrong, or that wasn\'t a valid user on Discord');
})

	}
}
module.exports.path = "../../commands/Image/avatar.js";
module.exports.help = {
    name: "avatar",
	type: "Image",
	info: "Gets a users avatar",
	perms: "MEMBER / none",
	useage: `@user / {prefix}avatar`
}