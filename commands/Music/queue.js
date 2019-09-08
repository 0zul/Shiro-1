const discord = require('discord.js');
const songsToMS = function(songs) {
	let awoo = 0;
	if(songs.length == 1){
	let songtime = songs[0].duration;
    let seconds = songtime.seconds*1000;
    let minutes = songtime.minutes*60*1000;
    let hours = songtime.hours*60*60*1000;
    let days = songtime.days*24*60*60*1000;
    let weeks = songtime.weeks*7*24*60*60*1000;
    let months = songtime.months*3*7*24*60*60*1000;
    let years = songtime.years*12*3*7*24*60*60*1000;
	let num = (seconds+minutes+hours+days+weeks+months+years);
	awoo+=num;
	}
	if(songs.length > 1){
	songs.forEach(song => {
	let songtime = song.duration;
    let seconds = songtime.seconds*1000;
    let minutes = songtime.minutes*60*1000;
    let hours = songtime.hours*60*60*1000;
    let days = songtime.days*24*60*60*1000;
    let weeks = songtime.weeks*7*24*60*60*1000;
    let months = songtime.months*3*7*24*60*60*1000;
    let years = songtime.years*12*3*7*24*60*60*1000;
	let num = (seconds+minutes+hours+days+weeks+months+years);
	awoo+=num;
	});
  }
	return awoo;
};

const parseSongTime = function(milliseconds) {
    var seconds = Math.floor(milliseconds/1000); milliseconds %= 1000;
    var minutes = Math.floor(seconds/60); seconds %= 60;
    var hours = Math.floor(minutes/60); minutes %= 60;
    var days = Math.floor(hours/24); hours %= 24;
    var years = Math.floor(days/365); days %= 365;
    var written = false;
	let num = ["00","01","02","03","04","05","06","07","08","09"];
    return(years?(written=true,`${years < 10 ? num[years] : years}`):"")+(written?":":"")
      +(days?(written=true,`${days < 10 ? num[days] : days}`):"")+(written?":":"")
      +(hours?(written=true,`${hours < 10 ? num[hours] : hours}`):"")+(written?":":"")
      +(minutes?(written=true,`${minutes < 10 ? num[minutes] : minutes}`):"")+(written?":":"")
      +(seconds?(written=true,`${seconds < 10 ? num[seconds] : seconds}`):"")+(written?"":"");
};

exports.run = async(client, message) => {
const serverQueue = client.music.serverqueue(`${message.guild.id}`);
if(!serverQueue || serverQueue.songs.length === 0) return message.channel.send('There is currently nothing in the queue.');
  let time = function(){
  if(serverQueue.repeat === true)return "∞";
  if(serverQueue.loopqueue === true)return "∞";
  if(serverQueue.playing === false)return "∞";
  else return parseSongTime(songsToMS(serverQueue.songs)-serverQueue.connection.dispatcher.totalStreamTime);
  }
  let i = 0;
	const queueEmbed = new discord.RichEmbed()
		.setColor("BLUE")
		.setTimestamp()
		.setAuthor(`Server Queue:`, `${message.guild.iconURL ? message.guild.iconURL : client.user.avatarURL}`)
		.setDescription(`${serverQueue.songs[1] ? serverQueue.songs.map(song => `**[${song.number-1}] -** [${song.title}](https://youtube.com/watch?v=${song.id})`).slice(1, 16).join('\n') : "Empty"}`)
		.addField("**Now Playing:**", `[${serverQueue.songs[0].title}](https://youtube.com/watch?v=${serverQueue.songs[0].id})`)
		.addField('**Total queue time**',`\`${time()}\``)
		.addField('**Total queue size**',`\`${serverQueue.songs.length} song(s)\``)
		.addField('**Loopqueue / Repeat / Pause**', `\`${serverQueue.loopqueue} / ${serverQueue.repeat} / ${serverQueue.playing == false ? true : false}\``)
		.addField('**Playing in**', `\`${serverQueue.voiceChannel.name}\``)
		message.channel.send(queueEmbed).then(async msg => {
			if(serverQueue.songs.length > 15) {
				const reaction1 = await msg.react('◀');
				const reaction2 = await msg.react('▶');
				let first = 1;
				let second = 16;

				const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
					time: 120000
				});
		  collector.on('collect', r => {
			  const reactionadd = serverQueue.songs.slice(first + 15, second + 15).length;
			  const reactionremove = serverQueue.songs.slice(first - 15, second - 15).length;

			  if (r.emoji.name === '▶' && reactionadd !== 0) {
				  r.remove(message.author.id);
				  first += 15;
				  second += 15;
          
				   const newEmbed = new discord.RichEmbed()
					.setColor("BLUE")
					.setTimestamp()
					.setAuthor(`Server Queue:`, `${message.guild.iconURL ? message.guild.iconURL : client.user.avatarURL}`)
					.setDescription(`${serverQueue.songs.map(song => `**[${song.number-1}] -** [${song.title}](https://youtube.com/watch?v=${song.id})`).slice(first, second).join('\n')}`)
					.addField("**Now Playing:**", `[${serverQueue.songs[0].title}](https://youtube.com/watch?v=${serverQueue.songs[0].id})`)
					.addField('**Total queue time**',`\`${time()}\``)
					.addField('**Total queue size**',`\`${serverQueue.songs.length} song(s)\``)
					.addField('**Loopqueue / Repeat / Pause**', `\`${serverQueue.loopqueue} / ${serverQueue.repeat} / ${serverQueue.playing == false ? true : false}\``)
					.addField('**Playing in**', `\`${serverQueue.voiceChannel.name}\``)
					msg.edit(newEmbed);
			  } else if (r.emoji.name === '◀' && reactionremove !== 0) {
				  r.remove(message.author.id);
				  first -= 15;
				  second -= 15;

				  const newEmbed = new discord.RichEmbed()
					.setColor("BLUE")
					.setTimestamp()
					.setAuthor(`Server Queue:`, `${message.guild.iconURL ? message.guild.iconURL : client.user.avatarURL}`)
					.setDescription(`${serverQueue.songs.map(song => `**[${song.number-1}] -** [${song.title}](https://youtube.com/watch?v=${song.id})`).slice(first, second).join('\n')}`)
					.addField("**Now Playing:**", `[${serverQueue.songs[0].title}](https://youtube.com/watch?v=${serverQueue.songs[0].id})`)
					.addField('**Total queue time**',`\`${time()}\``)
					.addField('**Total queue size**',`\`${serverQueue.songs.length} song(s)\``)
					.addField('**Loopqueue / Repeat / Pause**', `\`${serverQueue.loopqueue} / ${serverQueue.repeat} / ${serverQueue.playing == false ? true : false}\``)
					.addField('**Playing in**', `\`${serverQueue.voiceChannel.name}\``)
					msg.edit(newEmbed);
			  }
		  });
	    collector.on('end', () => {
			  msg.reactions.forEach(r => {
        r.remove();
        });
		  });
	  }
  })
} 

exports.help = {
    name: "queue",
	alias: "q"
}
