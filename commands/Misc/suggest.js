const Discord = require("discord.js");

module.exports = {
	path: '../../commands/Misc/suggest.js',
	help: {
		name: 'suggest',
		alias: 'suggestcommand',
		useage: '..suggest <command> | <detailed useage of command> | <what the command should do>'
	},
	run: async (client,message) => {
		if(!message.content.includes(" | ")||message.content.replace( /  +/g, ' ').split(' ').slice(1,2).join(' ').toLowerCase()==="help")return message.channel.send("Command useage:\n```\nNb.suggest <command> | <detailed useage of command> | <what the command should do>```");
		let s = message.content.replace( /  +/g, ' ').split(' ').slice(1).join(' ').split(" | ");

		message.channel.send(`Would you like to view your suggestion before it's sent out?\nIf yes type \`yes\`, if no type \`no\`.\n(This will be cancelled in 1 minute if no response.)`)
		.then((m) => {
		message.channel.awaitMessages(response => response.author.id === message.author.id, {
			max: 1,
			time: 60000,
			errors: ['time'],
        })
		.then((collected) => {
			if(collected.first().content.toLowerCase() === "yes"){
				let e = new Discord.RichEmbed()
				.setAuthor(message.author.tag,message.author.displayAvatarURL)
				.setTitle("Command Suggestion")
				.setTimestamp()
				.setColor(message.member.displayHexColor ? message.member.displayHexColor : "#00d6ff")
				.addField("Command:", s[0])
				.addField("Example useage:",s[1])
				.addField("Command description:",s[2])
				message.channel.send("here ya go:",{e}).then(a => a.delete(60000));
			} 
          	if(collected.first().content.toLowerCase() === "no"){
				m.edit('Your command suggestion has successfully been sent.');
			}
		}).catch(() => {
			m.edit('Your command suggestion has successfully been sent.\n[Timed out]');
		});
		});
		
		let servr = client.guilds.get("413921975312842752");
		let suggestionchl = servr.channels.get("621969059101278231");
		
		let embed = new Discord.RichEmbed()
		.setAuthor('Command Suggestion:',message.author.displayAvatarURL)
		.setThumbnail(client.user.displayAvatarURL)
		.setColor("#fff000")
		.addField('**Command:**', s[0])
		.addField("Example useage:",s[1])
		.addField("Command description:",s[2])
		.addField("**Sent by:**", `${message.author.tag}\nPing: <@${message.author.id}>\nThier ID: ${message.author.id}`)
		.setFooter("Pending Approval...")
		suggestionchl.send('<@377271843502948354>',{embed}).then(async msg => {
              const reaction1 = await msg.react('✅');
			  const reaction2 = await msg.react('❎');
			  const collector = msg.createReactionCollector((reaction, user) => user.id === "377271843502948354", {
				    time: 1000*60*60*24*1  //1 day (24h)
			  });
			  collector.on('collect', r => {
					if (r.emoji.name === '✅') {//:white_check_mark:
					    r.remove("377271843502948354");
						msg.reactions.forEach(r => {
							r.remove();
						});
						embed.setColor("#00ff00")
						embed.setTimestamp()
						embed.setFooter(`✅ Approved`,client.users.get("377271843502948354").displayAvatarURL)
						msg.edit(embed).then(m => m.pin());
						let apr = new Discord.RichEmbed()
						     .setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
							 .setColor('#00ff00')
							 .setDescription("Thanks for your suggestion, i've taken it into consideration and i believe it could actually be a \"good\" command\nI've also taken the liberty of pinning it somewhere so i don't forget about it too.")
							 .setTimestamp()
						message.author.send(apr).catch(() => {
							let apro = new Discord.RichEmbed()
						     .setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
							 .setColor('#00ff00')
							 .setDescription("Thanks for your suggestion, i've taken it into consideration and i believe it could actually be a \"good\" command\nI've also taken the liberty of pinning it somewhere so i don't forget about it too.")
							 .setTimestamp()
							 message.reply('I tried to dm you this, but it appears your dm\'s are closed',{apro});
						});
                    }
					if(r.emoji.name === '❎') {//:negative_squared_cross_mark:
						r.remove("377271843502948354");
						msg.reactions.forEach(r => {
							r.remove();
						});
						embed.setColor("#ff0000")
						embed.setTimestamp()
						embed.setFooter(`❎ Denied`,client.users.get("377271843502948354").displayAvatarURL)
						msg.edit(embed);
						msg.channel.send(`Why did you deny this request?`)
						.then((m) => {
						msg.channel.awaitMessages(response => response.author.id === "377271843502948354", {
							max: 1,
							time: 1000*60*60,
							errors: ['time'],
						}).then((collected) => {
							let reason = collected.first().content;
							let den = new Discord.RichEmbed()
						     .setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
							 .setColor('#ff0000')
							 .setDescription(reason)
							 .setTimestamp()
							message.author.send(den).catch(() => {
							let deni = new Discord.RichEmbed()
						     .setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
							 .setColor('#ff0000')
							 .setDescription(reason)
							 .setTimestamp()
							 message.reply('I tried to dm you this, but it appears your dm\'s are closed',{deni});
						});
		                })
		                });
                    }
				})
				collector.on('end', () => {
					msg.reactions.forEach(r => {
						r.remove();
					});
					embed.setColor("#fff000")
					embed.setTimestamp()
					embed.setFooter(`Missed`,client.users.get("377271843502948354").displayAvatarURL)
					msg.edit(embed);
				});
		})
	}
}
