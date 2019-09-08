const db = require('quick.db');
const Discord = require("discord.js");
const botroles = new db.table('BOTROLES');
const autoroles = new db.table('AUTOROLES');
const welcomechannels = new db.table('WELCOME_CHANNELS');
const welcomemessages = new db.table('WELCOME_MESSAGES');
const goodbyechannels = new db.table('GOODBYE_CHANNELS');
const goodbyemessages = new db.table('GOODBYE_MESSAGES'); 

module.exports = (client) => {
	
client.on("guildMemberAdd", async (message) => {
welcomechannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)welcomechannels.set(`${message.guild.id}`, "None set");
  });
let wchan = await welcomechannels.fetch(`${message.guild.id}`);

welcomemessages.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)welcomemessages.set(`${message.guild.id}`, `welxome {mem} to the server!`);
  });
let welcomeMessage = await welcomemessages.fetch(`${message.guild.id}`);

autoroles.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)autoroles.set(`${message.guild.id}`, "None set");
  });
let aurole = await autoroles.fetch(`${message.guild.id}`);

botroles.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)botroles.set(`${message.guild.id}`, "None set");
  });
let brole = await botroles.fetch(`${message.guild.id}`);
const botRole = message.guild.roles.get(brole); 

if(message.user.bot === true){
if(!botRole)return;
message.member.addRole(botRole.id);
} else {

if(welcomeMessage.includes('{mem}'))welcomeMessage=welcomeMessage.replace('{mem}', message.user);
if(welcomeMessage.includes('{mem.nick}'))welcomeMessage=welcomeMessage.replace('{mem.nick}', message.member.displayName);
if(welcomeMessage.includes('{server}'))welcomeMessage=welcomeMessage.replace('{server}', message.guild.name);
if(welcomeMessage.includes('{members}'))welcomeMessage=welcomeMessage.replace('{members}', message.guild.members.size);
const channel = message.guild.channels.get(wchan); 
const autoRole = message.guild.roles.get(aurole); 
   if(!channel)return;
   if(!autoRole){	
   channel.send(`${welcomeMessage}`);
   }
   if(autoRole){
    channel.send(`${welcomeMessage}`);
    message.member.addRole(autoRole);
  }
 };
});

//user leaves
client.on("guildMemberRemove", async (message) => {
goodbyechannels.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)goodbyechannels.set(`${message.guild.id}`, "None set");
  });
let goodbyeChannel = await goodbyechannels.fetch(`${message.guild.id}`);
goodbyemessages.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)goodbyemessages.set(`${message.guild.id}`, `oof ... \`{user}\` has left us`);
  });
let goodbyeMessage = await goodbyemessages.fetch(`${message.guild.id}`);

if(goodbyeMessage.includes('{user}'))goodbyeMessage=goodbyeMessage.replace('{user}', message.user.tag);
if(goodbyeMessage.includes('{members}'))goodbyeMessage=goodbyeMessage.replace('{members}', message.guild.members.size);
if(goodbyeMessage.includes('{server}'))goodbyeMessage=goodbyeMessage.replace('{server}', message.guild.name);
 const channel = message.guild.channels.get(goodbyeChannel);
    if(!channel)return;	
	channel.send(`${goodbyeMessage}`);
});


}
