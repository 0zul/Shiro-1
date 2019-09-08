const Discord = require('discord.js');
const request = require('snekfetch');

module.exports.run = async (client, message) => {
let nek = await request.get("https://nekobotv2.glitch.me/api/v1/image/neko.png");
//console.log(nek.headers.link);
	var RichEmbed = new Discord.RichEmbed()
   .setDescription(`[Picture link](${nek.headers.link})`)
   .setColor(`${message.member.displayHexColor}`)
	 .setTimestamp()
	 .setImage(`${nek.headers.link}`)
	 .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
message.channel.send(RichEmbed)
  
}
module.exports.path = "../../commands/Image/neko.js";
module.exports.help = {
    name: "neko"
}