const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
	path: '../../commands/Misc/userinfo.js',
	help: {
		name: 'userinfo',
		alias: 'ui',
		enabled: true,
		guildOnly: true,
		permLevel: 0,
		description: 'Returns a users info in the server',
		useage: 'userinfo (@user)'
	},
	run: async (client,message) => {
		    let name = message.content.replace( /  +/g, ' ').split(" ").slice(1).join(" ");
			var mem;
			if(!name){
				mem = message.mentions.members.first()||message.member;
			} else {
				mem = message.mentions.members.first()||message.guild.members.get(name)||message.guild.members.filter(m => m.displayName.toLowerCase().includes(name.toLowerCase())).first()||message.member;
			} 
			var embed = new Discord.RichEmbed()
				.setColor(`${mem.displayHexColor == '#000000' ? '#00ffff' : mem.displayHexColor}`)
				.setTimestamp()
				.setThumbnail(`${mem.user.avatarURL}`)
				.setAuthor(`Info on: ${mem.user.tag}`, mem.user.displayAvatarURL)
				.addField(`**ID:**`, `${mem.user.id}`)
				.addField(`**Status:**`, `${mem.presence.status}`)
				.addField(`**Created:**`, `${moment(mem.user.createdAt).format('MMMM Do YYYY, h:mm a')}`)
				.addField(`**Joined:**`, `${moment(mem.joinedAt).format('MMMM Do YYYY, h:mm a')}`)
				.addField(`**Highest role:**`, `${mem.highestRole.name}`)
				.addField(`**Hoist role?:**`, `${mem.hoistRole.name}`)
				.addField(`**display Color:**`, `${mem.displayHexColor}`)
				.addField(`**Roles:**`, `${mem.roles.map(r => r).slice(1,16).join(' | ')}`)
				.setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
				message.channel.send(embed);
	}
}
