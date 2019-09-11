const Discord = require("discord.js");
const db = require('quick.db');
const logchannels = new db.table('LOGCHANNELS');

module.exports.run = async (client,message) => {

if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.reply('You need to have the ``"MANAGE_MESSAGES"`` permission to use this command');
if(!message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES"))return message.channel.send('I need to have the ``"MANAGE_MESSAGES"`` permission to use this command');

logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${message.guild.id}`, "None set");
  });
const lochan = await logchannels.fetch(`${message.guild.id}`);
let logchnnel = message.guild.channels.get(lochan);

let id = message.content.split(' ').slice(2,3).join(' ');
let amount = message.content.split(' ').slice(1,2).join(' ');
if(amount.toLowerCase() === "prune"){
id = message.content.split(' ').slice(3,4).join(' ');
amount = message.content.split(' ').slice(2,3).join(' ');
}
const user = message.mentions.users.first()||client.users.get(id);
const mem = message.mentions.members.first()||message.guild.members.get(id);

if(!amount)return message.reply('i need an amount of messages to delete');
//if(amount > 100)amount = 100;
message.channel.fetchMessages({
 limit: amount,
}).then((messages) => {
if(logchnnel){
if(user){
	let prunebed = new Discord.RichEmbed()
	.setTitle(`messages have been pruned`)
	.setTimestamp()
	.setColor(0xff0000)
	.addField('**Moderator:**', `<@${message.author.id}>\nID: (${message.author.id})`)
	.addField('**User:**', `<@${user.id}>\nID: (${user.id})`)
	.addField('**Channel:**', `<#${message.channel.id}>`)
	.addField('**Amount of messages:**', `${amount}`)
	logchnnel.send(prunebed);
	const filterBy = user ? user.id : client.user.id;
	messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
	message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
	message.channel.send(`**${message.member.displayName}** pruned ${amount} messages from ${mem.displayName}`).then(msg=>{msg.delete(15000)});
	}
 if(!user) {
	let prunebed = new Discord.RichEmbed()
	.setTitle(`messages have been pruned`)
	.setTimestamp()
	.setColor(0xff0000)
	.addField('**Moderator:**', `<@${message.author.id}>\nID: (${message.author.id})`)
	.addField('**Channel:**', `<#${message.channel.id}>`)
	.addField('**Amount of messages:**', `${amount}`)
	logchnnel.send(prunebed);
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    message.channel.send(`**${message.member.displayName}** pruned ${amount} messages`).then(msg=>{msg.delete(15000)});
 }
} else {
	if(user){
	const filterBy = user ? user.id : client.user.id;
	messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
	message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
	message.channel.send(`**${message.member.displayName}** pruned ${amount} messages from ${mem.displayName}`).then(msg=>{msg.delete(15000)});
	}
	if(!user){
	message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
    message.channel.send(`**${message.member.displayName}** pruned ${amount} messages`).then(msg=>{msg.delete(15000)});
	}
}
})

}
module.exports.path = "../../commands/Moderation/prune.js";
module.exports.help = {
    name: "prune",
	type: "Mod",
	info: "prunes messages in a server",
	perms: "MANAGE_MESSAGES",
	useage: "@user <Amount>/ --prune <amount>"
}
