const Discord = require('discord.js');
const db = require('quick.db');
const logchannels = new db.table('LOGCHANNELS');

//私を殺してください

module.exports.run = async(client, message) => {
  logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${message.guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${message.guild.id}`);
const lc = message.guild.channels.get(logChannel);

let mid = message.content.split(' ').slice(1,2).join(' ');
if(!message.member.permissions.has(8) && message.author.id !== client.owner.id)return message.channel.send("You don't have permission to use this command.");
if(!message.guild.members.get(client.user.id).permissions.has(8))return message.channel.send("I don't have permission to use this command.");
    
client.fetchUser(mid).then(user => {
message.guild.ban(user.id).catch(err => {
        message.channel.send("Failed to ban the user ``"+user.username+"``")
        console.log(err)
  })
 let embed = new Discord.RichEmbed()
    .setTitle('Hack-Ban / ID Ban')
    .setColor(message.member.displayHexColor)
    .setTimestamp()
    .addField("Moderator:", `\`${message.author.tag}\` with ID: ${message.author.id}`)
    .addField("Banned user:", `\`${user.username}#${user.discriminator}\` with ID: ${user.id}`)
  lc.send(embed);
message.channel.send(`Successfully Banned \`${user.username}#${user.discriminator}\``);

 })
}
module.exports.path = "../../commands/Moderation/hackban.js";
exports.help = {
  category: 'Moderation',
  name: 'hackban'
};