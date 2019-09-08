let discord = require('discord.js');

exports.run = (client,message) => {
	let serverQueue = client.music.serverqueue(`${message.guild.id}`);
if (!message.member.voiceChannel) return message.channel.send('⚠️ You are not in a voice channel!');
    if (serverQueue.playing == true) {
        if(serverQueue.repeat == false){
            serverQueue.repeat = true;
            message.channel.send('🔂 Repeat is on, repeating current song');
        } else {
            serverQueue.repeat = false;
            message.channel.send('⏺️ Repeat is off, back to the queued songs');
        }
    } else {
    message.channel.send('⚠️ There is nothing playing.');
    }
}
exports.path = '../../Music/repeat.js';
exports.help = {
	name: "repeat",
	alias: "loop"
}