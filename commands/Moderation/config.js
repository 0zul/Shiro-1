const Discord = require("discord.js");
const db = require('quick.db');
const prefixes = new db.table('PREFIXES');
const levelson = new db.table('LEVELSON');
const logchannels = new db.table('LOGCHANNELS');

module.exports.run = async (client,message) => {
client.owner = client.users.get("377271843502948354");

prefixes.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)prefixes.set(`${message.guild.id}`, "sk.");
  });
levelson.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)levelson.set(`${message.guild.id}`, "false");
  });
logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)logchannels.set(`${message.guild.id}`, "None set");
  });

let logchannel = await logchannels.fetch(`${message.guild.id}`);
let levelsystem = await levelson.fetch(`${message.guild.id}`);
const prefix = await prefixes.fetch(`${message.guild.id}`);
let lchan = message.guild.channels.get(logchannel);
if(!message.member.permissions.has(8)&&message.author.id !== client.owner.id)return message.channel.send('you need the ``"ADMINISTRATOR"`` permission to use this');
    
let embed = new Discord.RichEmbed()
    .setTitle('Here\'s the server configuration:')
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setDescription(`\`\`\`css
• Prefix      :-:  ${prefix}\`\`\``)
.addField('**Channels:**',`\`\`\`css
• logChannel  :-:  ${logchannel === "None set" ? "None set" : `#${lchan.name}`}\`\`\``)
.addField('**Misc:**',`\`\`\`css
• levelSystem :-:  ${levelsystem === "false" ? "Disabled" : "Enabled"}\`\`\``)
  message.channel.send(embed);

}
module.exports.path = "../../commands/Moderation/config.js";
module.exports.help = {
  name: "config",
  alias: "conf"
}