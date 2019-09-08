const Discord = require("discord.js");
const db = require('quick.db');
const prefixes = new db.table('PREFIXES');
const logchannels = new db.table('LOGCHANNELS');

module.exports.run = async (client,message) => {  
client.owner = client.users.get("377271843502948354");
prefixes.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)prefixes.set(`${message.guild.id}`, "sk.");
  });
const prefix = await prefixes.fetch(`${message.guild.id}`);

let cmd = message.content.split(' ').slice(1,2).join(' ');

if(!message.member.permissions.has(8) && message.author.id !== client.owner.id)return message.channel.send('you need the ``"ADMINISTRATOR"`` permission to use this');
if(!cmd || cmd === "help"){
    let embed = new Discord.RichEmbed()
    .setTitle('How to use the reset command:')
    .setDescription('This is a moderation command used to set the server config settings back to default')
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .addField('**Command usages:**', `\`\`\`css\n${prefix}reset prefix\n${prefix}reset logChannel\`\`\``)
  message.channel.send(embed);
}
if(cmd === "prefix"){
  prefixes.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined){
prefixes.set(`${message.guild.id}`, "sk.");
    } else {
prefixes.set(`${message.guild.id}`, "sk.");
    }
  });
  message.channel.send('Server prefix set back to it\'s Default: ``sk.``');
}
if(cmd === "logChannel"||cmd === "logchannel"){
logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined){
logchannels.set(`${message.guild.id}`, "None set");
    } else {
logchannels.set(`${message.guild.id}`, "None set");
    }
  });
  message.channel.send('Sucessfully reset the logChanel');
}
}
module.exports.path = "../../commands/Moderation/reset.js";
module.exports.help = {
  name: "reset"
}