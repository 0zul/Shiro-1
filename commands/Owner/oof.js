const Discord = require('discord.js');

module.exports.run = async (client, message) => {
let id = message.content.split(' ').slice(1).join(' ');
let usr = await client.fetchUser(id);
message.channel.send(`${usr.username}#${usr.discriminator}\n${usr.displayAvatarURL}`);
}
module.exports.path = "../../commands/Owner/oof.js";
module.exports.help = {
    name: "oof"
}




