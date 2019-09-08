const db = require('quick.db');
const Discord = require("discord.js");
const prefixes = new db.table('PREFIXES');
const levelson = new db.table("LEVELSON");
const botroles = new db.table('BOTROLES');
const autoroles = new db.table('AUTOROLES');
const logchannels = new db.table('LOGCHANNELS');
const welcomechannels = new db.table('WELCOME_CHANNELS');
const welcomemessages = new db.table('WELCOME_MESSAGES');
const goodbyechannels = new db.table('GOODBYE_CHANNELS');
const goodbyemessages = new db.table('GOODBYE_MESSAGES'); 

module.exports.run = async (client,message) => {
client.owner = client.users.get("377271843502948354");
  prefixes.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)prefixes.set(`${message.guild.id}`, "nb.");
  });
const prefix = await prefixes.fetch(`${message.guild.id}`);

let cmd = message.content.split(' ').slice(1,2).join(' ');	
let args = message.content.split(' ').slice(2).join(' ');
if(cmd.toLowerCase() === "set"){
cmd = message.content.split(' ').slice(2,3).join(' ');	
args = message.content.split(' ').slice(3).join(' ');
}

if(!message.member.hasPermission(8) && message.author.id !== client.owner.id)return message.channel.send('you need the ``"ADMINISTRATOR"`` permission to use this');
if(!cmd || cmd === "help"){
    let embed = new Discord.RichEmbed()
    .setTitle('How to use the Set command:')
    .setDescription('This is a moderation command used to set the server config')
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .addField('**Command usages:**', `\`\`\`css\n${prefix}set prefix <new prefix>\n${prefix}set autoRole <role>\n${prefix}set botRole <role>\n${prefix}set levelSystem <on/off>\n${prefix}set logChannel <Channel>\n${prefix}set welcomeChannel <Channel>\n${prefix}set goodbyeChannel <Channel>\n${prefix}set welcomeMessage <Message>\n${prefix}set goodbyeMessage <Message>\`\`\``)
    .addField('Hint For the Messages:', '1) In the welcomeMessage ... you can use `{mem}` to @ the joining member, `{mem.nick}` to add thier nickname, `{members}` to get the current memberCount of the server, and `{server}` to get the server name\n\n2) In the goodbyeMessage ... you can use `{user}` to get the leaving users tag, `{members}` to get the current server memberCount, and `{server}` to get the servers name\n\n3) If you use backticks(`` ` ``) add a backslash(`\\`) before them\nExample:```\nhello \\`{mem.nick}\\`, welcome to the server!```')
	 message.channel.send(embed);
}
if(cmd.toLowerCase() === "prefix"){
if(!args)return message.channel.send("oi, i need a new prefix, don't i?");  
prefixes.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined){
prefixes.set(`${message.guild.id}`, `${args}`);
    } else {
prefixes.set(`${message.guild.id}`, `${args}`);
   }
  });
  message.channel.send('New server prefix set to: ``'+ args +'``');
}

if(cmd.toLowerCase() === "autorole"||cmd.toLowerCase() === "arole"){
if(!message.guild.members.get(client.user.id).permissions.has("MANAGE_ROLES"))return message.channel.send('oof ... i need to have the `MANAGE_ROLES` permission for this');
if(!args)return message.channel.send("oi, i need a role for this");
let role = message.guild.roles.find(r => r.name === args)||message.mentions.roles.first()||message.guild.roles.get(args);
if(!role)return message.channel.send("oof ... i couldn't find that role");
if(role.position >= message.guild.members.get(client.user.id).highestRole.position)return message.channel.send("Please make sure my highest role is above that role and try again");
autoroles.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined){
autoroles.set(`${message.guild.id}`, `${role.id}`);
let ebed = new Discord.RichEmbed()
.setColor(message.member.displayHexColor)
.setTimestamp()
.setDescription(`New autoRole for this server: <@&${role.id}>`)
message.channel.send(ebed);
    } else {
autoroles.set(`${message.guild.id}`, `${role.id}`);
let ebed = new Discord.RichEmbed()
.setColor(message.member.displayHexColor)
.setTimestamp()
.setDescription(`New autoRole for this server: <@&${role.id}>`)
message.channel.send(ebed);
   }
  });
}

if(cmd.toLowerCase() === "levelsystem"||cmd.toLowerCase() === "levels"){
if(!args)return message.channel.send("oi, u want it on or off m8?");  
  if(args === "on"){
  levelson.set(`${message.guild.id}`, "true");
  message.channel.send(`Succesfully \`Enabled\` the levelSystem for this sever`);
  }
  if(args === "off"){
  levelson.set(`${message.guild.id}`, "false");
  message.channel.send(`oof ... Succesfully \`Disabled\` the levelSystem for this sever`);
  }
}

if(cmd === "logChannel"||cmd === "logs"){
let channel = message.mentions.channels.first()||message.guild.channels.find(c => c.name === args&&c.type == "text");
if(!channel)return message.channel.send("oof ... i couldn't find that channel");  
if(!channel.permissionsFor(client.user).toArray().includes('SEND_MESSAGES'))return message.channel.send('oof ... it seems like i can\'t send messages to that channel');

logchannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined){
logchannels.set(`${message.guild.id}`, `${channel.id}`);
    } else {
logchannels.set(`${message.guild.id}`, `${channel.id}`);
   }
  });
message.channel.send(`New logChannel set to: <#${channel.id}>`);
}

}
module.exports.path = "../../commands/Moderation/set.js";
module.exports.help = {
  name: "set"
}