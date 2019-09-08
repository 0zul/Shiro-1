const Discord = require('discord.js');
const db = require('quick.db');
const xpl = new db.table("TOTAL_POINTS");
const levelson = new db.table('LEVELSON');

module.exports.run = async (client, message) => {
  let res = "";
levelson.fetch(`${message.guild.id}`).then(i => {
  if(i == null||i == NaN||i == undefined||i === 0)levelson.set(`${message.guild.id}`, "false");
});

let lvls = await levelson.fetch(`${message.guild.id}`);
if(lvls === "false")return message.channel.send("``Error:`` 404\nserver not found\nIs the `levelSystem` Enabled on this server?");

xpl.startsWith(`${message.guild.id}_`, {
  sort: '.data'
}).then(async resp => {
if(resp.length > 15)resp.length = 15;
  let i = 0;
  let o = 0;
  for(i in resp) {
    let u = await client.fetchUser(resp[i].ID.split('_')[1]);
    res += `${++o}) ${u.username} - \`${(resp[i].data).toLocaleString()} XP\`\n`;
  }

 var RichEmbed = new Discord.RichEmbed()
    .setTitle(`server XP leaderboard ~~*top 15*~~`)
    .setDescription(res)
    .setColor(`${message.member.displayHexColor}`)
 	.setTimestamp()
  .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
 message.channel.send(RichEmbed)
  
});
}
module.exports.path = "../../commands/XP/lb.js";
module.exports.help = {
    name: "lb",
   alias: "leaderboard"
}