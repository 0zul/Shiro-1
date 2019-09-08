const Discord = require('discord.js');
const request = require('snekfetch');

module.exports.run = async (client, message) => {

let usr = message.mentions.users.first()||message.author;
let nek = await request.get(`https://nekobotv2.glitch.me/api/v1/pvt/subs`);
 	var RichEmbed = new Discord.RichEmbed()
    .setTitle(`PewDiePie vs. T-Series:`)
    .setThumbnail(nek.body.winnerIcon)
    .setDescription(`just testing the [pvt api](https://nekobotv2.glitch.me/api/v1/pvt/subs)`)
    .setColor(`${message.member.displayHexColor}`)
 	 .setTimestamp()
   .addField('**Current winner:**', `${nek.body.curWinner} with ${parseInt(nek.body.winnerSubs).toLocaleString()} subscribers`)
   .addField('**Current loser:**', `${nek.body.curLoser} with ${parseInt(nek.body.loserSubs).toLocaleString()} subscribers`)
   .addField('**Subscriber difference:**', `${(nek.body.subDifference).toLocaleString()}`)
 	 .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
 message.channel.send(RichEmbed)

}
module.exports.path = "../../commands/Misc/pvt.js";
module.exports.help = {
    name: "pvt"
}