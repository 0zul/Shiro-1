const Discord = require("discord.js");
const db = require('quick.db');
const layouts = new db.table('LAYOUTS');
const prefixes = new db.table('PREFIXES');

module.exports.run = async (client,message) => {
client.owner = client.users.get("377271843502948354");
  prefixes.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)prefixes.set(`${message.guild.id}`, "nb.");
  });
layouts.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)layouts.set(`${message.guild.id}_${message.author.id}`, 1);
  });
const prefix = await prefixes.fetch(`${message.guild.id}`);

let cmd = message.content.split(' ').slice(1,2).join(' ');
let args = parseInt(cmd);

if(!cmd||cmd === "help"||!args){
    let embed = new Discord.RichEmbed()
    .setTitle('How to use the setlayout command:')
    .setDescription('This is a misc command used to set the layout of your rank/level card\n\nHINT~ You can click on the layout to see a sample of what it looks like ^~^')
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .addField('**Command usages:**', `\`\`\`css\n${prefix}setlayout <layout number>\`\`\``)
    .addField('**Current layouts:**', `[Layout 1 (default)](https://media.discordapp.net/attachments/342733925732319253/546801736879308804/file.jpg)\n\n[Layout 2](https://media.discordapp.net/attachments/342733925732319253/546811861690220575/file.jpg)\n\n[Layout 3](https://media.discordapp.net/attachments/342733925732319253/546812276745699355/file.jpg)\n\n[Layout 4](https://media.discordapp.net/attachments/342733925732319253/546812772852301844/file.jpg)`)
    .setFooter(`Requested by: ${message.member.displayName}`, message.author.avatarURL)
return message.channel.send(embed);
}
if(args < 1||args > 4)return message.channel.send("oof .. that doesn't seem to be one of my current layouts");
layouts.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if(i == null||i == NaN||i == undefined){
layouts.set(`${message.guild.id}_${message.author.id}`, args);
    } else {
layouts.set(`${message.guild.id}_${message.author.id}`, args);
   }
  });
  message.channel.send('I\'ve Succesfully set your new layout to ``Layout: '+ args +'``');
}
module.exports.path = "../../commands/XP/setlayout.js";
module.exports.help = {
  name: "setlayout"
}