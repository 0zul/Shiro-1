const Discord = require('discord.js');
const os = require('os');
const getUT = function(ms) {
    var s = Math.floor(ms/1000); ms %= 1000;
    var m = Math.floor(s/60); s %= 60;
    var h = Math.floor(m/60); m %= 60;
    var d = Math.floor(h/24); h %= 24;
    return `${d}d ${h}h ${m}m ${s}s`;
};
let cpuusage = process.cpuUsage();
let useage = Math.floor(cpuusage.user/cpuusage.system);
let memused = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`;
let totalmem = `${(os.totalmem() / 1000000000).toFixed(2)}GB`;

exports.run = (client, message, args) => {
var neko = client.users.get("377271843502948354");
console.log(os);
	let botembed = new Discord.RichEmbed()
		.setColor(message.member.displayHexColor)
		.setThumbnail(client.user.displayAvatarURL)
		.setDescription("Bot Owner: <@"+ neko.id +">")
        .addField("CPU", `${os.cpus().map(i => `${i.model}`)[0]}`)
        .addField('VPS', `**Platform** - ${os.type}\n**CPU Cores** - ${os.cpus().length}`)
		.addField('Users', `${client.users.size}`)
		.addField('Channels', `${message.client.channels.size}`)
		.addField("Memory Used", `${memused} / ${totalmem}`)
		.addField("CPU Used", `${useage}%`)
		.setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
		.addField("Uptime", `${getUT(client.uptime)}`)
	message.channel.send(botembed);
	
}
module.exports.path = "../../commands/Misc/stats.js";
exports.help = {
  name: 'stats',
};