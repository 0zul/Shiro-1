const Discord = require("discord.js");
const db = require('quick.db');
const logchannels = new db.table('LOGCHANNELS');
var embed;

module.exports = (client) => {
//user joins
client.on("guildMemberAdd", async (message) => {
  logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${message.guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${message.guild.id}`);
    let avatar = message.user.displayAvatarURL;
    const joinMsg = new Discord.RichEmbed()
    .setAuthor(message.user.username, avatar)
    .setTitle("Member Joined")
    .setColor(0x00ff00)
    .setDescription(message.user.tag + ` Joined **${message.guild.name}**`)
    .setTimestamp()
    .setFooter("v1.1")
    const channel = message.guild.channels.get(logChannel);  
   if(!channel)return;	
   channel.send({embed: joinMsg});
 });
//user leaves
client.on("guildMemberRemove", async (message) => {
  logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${message.guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${message.guild.id}`);
    let avatar = message.user.displayAvatarURL;
    const LeaveMsg = new Discord.RichEmbed()
    .setAuthor(message.user.username, avatar)
    .setTitle("Member left")
    .setColor(0xfff000)
    .setDescription(message.user.tag + ` Left **${message.guild.name}**`)
    .setTimestamp()
    .setFooter("v1.1")
    const channel = message.guild.channels.get(logChannel);
    if(!channel)return;	
	channel.send({embed: LeaveMsg})
 });
//message deleted
client.on('messageDelete', async (message) => {
if(message.author.bot)return;
  logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${message.guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${message.guild.id}`);
    let avatar = message.author.avatarURL;
    const delMsg = new Discord.RichEmbed()
    .setAuthor(message.author.tag, avatar)
    .setColor(0xfff000)
	.setDescription(`**message sent by** ${message.author} **deleted in** ${message.channel}\n\n${message.cleanContent}`)
    .setTimestamp()
    .setFooter("v1.1")
    const channel = message.guild.channels.get(logChannel);
    if(!channel)return;	
	channel.send({embed: delMsg});
 });
//message edited
client.on('messageUpdate', async (oldMessage, newMessage) => {
if(newMessage.author.bot)return;
  logchannels.fetch(`${newMessage.guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${newMessage.guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${newMessage.guild.id}`);
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
    let avatar = newMessage.author.avatarURL;
    const editMsg = new Discord.RichEmbed()
    .setAuthor(newMessage.author.tag, avatar)
    .setColor(0xfff000)
	.setDescription(`**Message edited in** ${newMessage.channel}`)
	.addField('**Before:**', oldMessage.cleanContent)
	.addField('**After:**', newMessage.cleanContent)
    .setTimestamp()
    .setFooter("v1.1")
    const channel = newMessage.guild.channels.get(logChannel);
    if(!channel)return;	
    channel.send({embed: editMsg});
	}
 });
//user has been banned
client.on('guildBanAdd', async function(guild, user) {
  logchannels.fetch(`${guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${guild.id}`);
var log = guild.channels.get(logChannel);
if(!log)return;
    embed = new Discord.RichEmbed()
			.setTitle('User banned')
			.setColor(0xff0000)
			.setTimestamp()
			.setDescription(`\n${user}`)
			.setFooter('v1.1')
    log.send({embed});
	});
//user has been unbanned
client.on('guildBanRemove', async function(guild, user) {
  logchannels.fetch(`${guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${guild.id}`);
var log = guild.channels.get(logChannel);
if(!log)return;
	embed = new Discord.RichEmbed()
			.setTitle('User Un-banned')
			.setColor(0xfffff0)
			.setTimestamp()
			.setDescription(`\n${user}`)
			.setFooter('v1.1')
    log.send({embed});
 });
//user update
client.on('guildMemberUpdate', async function(oldMember, newMember) {
if(newMember.user.bot)return;
  logchannels.fetch(`${newMember.guild.id}`).then(i => {
    if(i == null||i === undefined)logchannels.set(`${newMember.guild.id}`, "None set");
  });
const logChannel = await logchannels.fetch(`${newMember.guild.id}`);
const log = newMember.guild.channels.get(logChannel);
if(!log)return;
    //declare changes
    var Changes = {
        unknown: 0,
        addedRole: 1,
        removedRole: 2,
        username: 3,
        nickname: 4,
        avatar: 5
    };
    var change = Changes.unknown;

    //check if roles were removed
    var removedRole = '';
    oldMember.roles.forEach(function(value) {
        if(newMember.roles.find('id', value.id) == null) {
            change = Changes.removedRole;
            removedRole = value;
        }
    });

    //check if roles were added
    var addedRole = '';
    newMember.roles.forEach(function(value) {
        if(oldMember.roles.find('id', value.id) == null) {
            change = Changes.addedRole;
            addedRole = value;
        }
    });

    //check if username changed
    if(newMember.user.username != oldMember.user.username)
        change = Changes.username;

    //check if nickname changed
    if(newMember.nickname != oldMember.nickname)
        change = Changes.nickname;

    //check if avatar changed
    if(newMember.user.avatarURL != oldMember.user.avatarURL)
        change = Changes.avatar;

    if (log != null) {
        switch(change) {
            case Changes.unknown:
			embed = new Discord.RichEmbed()
			.setTitle('User Update')
			.setColor(0xfff000)
			.setTimestamp()
			.setDescription(`\n${newMember}`)
			.setFooter('v1.1')
                   log.send({embed});
                break;
            case Changes.addedRole:
			embed = new Discord.RichEmbed()
			.setTitle('Role added')
			.setColor(0xf0f0f0)
			.setTimestamp()
			.setDescription(`User: <@${newMember.user.id}>\n\nRole: <@&${addedRole.id}>`)
			.setFooter('v1.1')
                log.send({embed});
				break;
            case Changes.removedRole:
			embed = new Discord.RichEmbed()
			.setTitle('Role removed')
			.setColor(0xff00f0)
			.setTimestamp()
			.setDescription(`User: <@${newMember.user.id}>\n\nRole: <@&${removedRole.id}>`)
			.setFooter('v1.1')
                log.send({embed});
                break;
            case Changes.username:
			embed = new Discord.RichEmbed()
			.setTitle('Username changed')
			.setColor(0xfff000)
			.setTimestamp()
			.setDescription(`User: ${newMember}`)
			.addField('**Before:**', `\`\`\`css\n\${oldMember.user.username}#${oldMember.user.discriminator}\`\`\``, true)
			.addField('**After:**', `\`\`\`css\n\${newMember.user.username}#${newMember.user.discriminator}\`\`\``, true)
			.setFooter('v1.1')
			     log.send({embed});
                break;
            case Changes.nickname:
			embed = new Discord.RichEmbed()
			.setTitle('Nickname changed')
			.setColor(0xffff00)
			.setTimestamp()
			.setDescription(`User: <@${newMember.user.id}>`)
			.addField('**Before:**', `${oldMember.nickname == null ? "None" : oldMember.nickname }`, true)
			.addField('**After:**', `${newMember.nickname == null ? "None" : newMember.nickname}`, true)
			.setFooter('v1.1')
			     log.send({embed});
                break;
            case Changes.avatar:
			embed = new Discord.RichEmbed()
			.setTitle('Avatar changed')
			.setColor(0xfff000)
			.setTimestamp()
			.setDescription(`User: <@${newMember.user.id}>`)
			.addField('**Before:**', `[link](${oldMember.user.avatarURL})`, true)
			.addField('**After:**', `[link](${newMember.user.avatarURL})`, true)
			.setFooter('v1.1')
			log.send({embed});
                break;
        }
    }
  });



}
