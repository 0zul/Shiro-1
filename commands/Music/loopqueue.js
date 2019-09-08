const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
	let serverQueue = client.music.serverqueue(`${message.guild.id}`);
    if (!message.member.voiceChannel) return message.channel.send('⚠️ You are not in a voice channel!');
    if (serverQueue.playing == true) {
        if(serverQueue.loopqueue == false){
            serverQueue.loopqueue = true;
            message.channel.send('🔁 loopqueue is on, looping current queue');
        } else {
            serverQueue.loopqueue = false;
            message.channel.send('⏺️ loopqueue is off, back to the queued songs');
        }
    } else {
    message.channel.send('⚠️ There is nothing playing.');
    }
}
module.exports.path = "../../commands/Music/loopqueue.js";
module.exports.help = {
name: "loopqueue",
alias: "loopq"
  }