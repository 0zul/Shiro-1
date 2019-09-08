const Discord = require("discord.js");

module.exports.run = async (client,message) => {

	message.channel.send('Pinging...').then(sent => {
    sent.edit(`pong\nmy ping - \`${sent.createdTimestamp - message.createdTimestamp}\`ms\napi ping - \`${Math.floor(client.ping)}\`ms`);
	});

}
module.exports.path = "../../commands/Misc/ping.js";
module.exports.help = {
    name: "ping"
}