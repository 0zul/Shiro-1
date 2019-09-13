const Discord = require("discord.js");

module.exports = {
	help: {
		path: '../../commands/Misc/suggest.js',
		name: 'suggest',
		alias: 'command',
		useage: '..suggest <command> | <detailed useage of command> | <what the command should do>'
	},
	run: async (client,message) => {
		if(!message.content.includes(" | ")||message.content.replace( /  +/g, ' ').split(' ').slice(1,2).join(' ').toLowerCase()==="help")return message.channel.send("Command useage:\n```\n..suggest <command> | <detailed useage of command> | <what the command should do>```");
		const s = message.content.replace( /  +/g, ' ').split(' ').slice(1).join(' ').split(" | ");
        	if(!s[1])return message.channel.send("I need an example useage of the command for the suggestion");
		if(!s[2])return message.channel.send("I need a description on what the command should do");

		const servr = client.guilds.get("413921975312842752");
		const suggestionchl = servr.channels.get("621969059101278231");
		
		message.channel.send(`Would you like to view your suggestion before it's sent out?\nIf yes type \`yes\`, if no type \`no\`.`)
		.then((m) => {
		message.channel.awaitMessages(response => response.author.id === message.author.id, {
			max: 1,
			time: 60000,
			errors: ['time'],
        })
		.then((collected) => {
			if(collected.first().content.toLowerCase() === "yes"){
				message.channel.send("here ya go:",{
				"embed": {
						"title": "Command Suggestion inbound:",
						"color": 55039,
						"timestamp": new Date,
						"author": {
							"name": message.author.tag,
							"icon_url": message.author.displayAvatarURL
						},
						"fields": [
								{
								"name": "Command:",
								"value": s[0]
								},
								{
								"name": "Example useage:",
								"value": s[1]
								},
								{
								"name": "Command description:",
								"value": s[2]
								},
								{
								"name": "✅",
								"value": "Send message",
								"inline": true
								},
								{
								"name": "❎",
								"value": "Disgard",
								"inline": true
								}
						]
				}
				}).then(async msg => {
              const reaction1 = await msg.react('✅');
			  const reaction2 = await msg.react('❎');
			  const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, {
				    time: 1000*60*3  //3 minutes
			  });
			  collector.on('collect', r => {
					if (r.emoji.name === '✅'){//:white_check_mark:
						msg.reactions.forEach(r => {
							r.remove();
						});
						msg.edit('Your command suggestion has successfully been sent.');
						let embod = new Discord.RichEmbed()
						.setAuthor('Command Suggestion:',message.author.displayAvatarURL)
						.setThumbnail(client.user.displayAvatarURL)
						.setColor("#fff000")
						.addField('**Command:**', s[0])
						.addField("Example useage:",s[1])
						.addField("Command description:",s[2])
						.addField("**Sent by:**", `${message.author.tag}\nPing: <@${message.author.id}>\nThier ID: ${message.author.id}`)
						.setFooter("Pending Approval...")
						suggestionchl.send('<@377271843502948354>',{embod}).then(async mg => {
						const reaction1 = await mg.react('✅');
						const reaction2 = await mg.react('❎');
						const collecto = mg.createReactionCollector((reaction, user) => user.id === "377271843502948354", {
								time: 1000*60*60*24*1  //1 day (24h)
						});
						collecto.on('collect', r => {
								if (r.emoji.name === '✅') {//:white_check_mark:
									mg.reactions.forEach(r => {
										r.remove();
									});
									embod.setColor("#00ff00")
									embod.setTimestamp()
									embod.setFooter(`Approved`,client.users.get("377271843502948354").displayAvatarURL)
									mg.edit(embod).then(m => m.pin());
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
									mg.reactions.forEach(r => {
										r.remove();
									});
									embod.setColor("#ff0000")
									embod.setTimestamp()
									embod.setFooter(`Denied`,client.users.get("377271843502948354").displayAvatarURL)
									mg.edit(embod);
									mg.channel.send(`Why did you deny this request?`)
									.then((m) => {
									mg.channel.awaitMessages(response => response.author.id === "377271843502948354", {
										max: 1,
										time: 1000*60*60,
										errors: ['time'],
									}).then((collectd) => {
										let reason = collectd.first().content;
										let den = new Discord.RichEmbed()
										.setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
										.setColor('#ff0000')
										.setDescription(reason)
										.setTimestamp()
										mg.channel.send(`I let them know the bad news`);
										message.author.send(den).catch(() => {
										let deni = new Discord.RichEmbed()
										.setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
										.setColor('#ff0000')
										.setDescription(reason)
										.setTimestamp()
										mg.channel.send(`I let them know the bad news`);
										message.reply('I tried to dm you this, but it appears your dm\'s are closed',{deni});
										});
									})
									});
								}
							})
							collecto.on('end', () => {
								mg.reactions.forEach(r => {
									r.remove();
								});
								embod.setColor("#fff000")
								embod.setTimestamp()
								embod.setFooter(`Missed`,client.users.get("377271843502948354").displayAvatarURL)
								mg.edit(embod);
							});
						});
                    }
					if(r.emoji.name === '❎') {//:negative_squared_cross_mark:
						msg.reactions.forEach(r => {
							r.remove();
						});
						return message.channel.send("Message Disgarded");
                    }
				})
				collector.on('end', () => {
					msg.reactions.forEach(r => {
						r.remove();
					});
					return msg.edit("Message Disgarded [Timeout]");
				}); 
				});
			}
          	if(collected.first().content.toLowerCase() === "no"){
				message.channel.send('Your command suggestion has successfully been sent.');
				let embed = new Discord.RichEmbed()
					.setAuthor('Command Suggestion:',message.author.displayAvatarURL)
					.setThumbnail(client.user.displayAvatarURL)
					.setColor("#fff000")
					.addField('**Command:**', s[0])
					.addField("Example useage:",s[1])
					.addField("Command description:",s[2])
					.addField("**Sent by:**", `${message.author.tag}\nPing: <@${message.author.id}>\nThier ID: ${message.author.id}`)
					.setFooter("Pending Approval...")
					suggestionchl.send('<@377271843502948354>',{embed}).then(async mw => {
							const reaction3 = await mw.react('✅');
							const reaction4 = await mw.react('❎');
							const collector = mw.createReactionCollector((reaction, user) => user.id === "377271843502948354", {
									time: 1000*60*60*24*1  //1 day (24h)
							});
							collector.on('collect', r => {
									if(r.emoji.name === '✅') {//:white_check_mark:
										mw.reactions.forEach(r => {
											r.remove();
										});
										embed.setColor("#00ff00")
										embed.setTimestamp()
										embed.setFooter(`Approved`,client.users.get("377271843502948354").displayAvatarURL)
										mw.edit(embed).then(m => m.pin());
										let apr1 = new Discord.RichEmbed()
											.setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
											.setColor('#00ff00')
											.setDescription("Thanks for your suggestion, i've taken it into consideration and i believe it could actually be a \"good\" command\nI've also taken the liberty of pinning it somewhere so i don't forget about it too.")
											.setTimestamp()
										message.author.send(apr1).catch(() => {
										let apro1 = new Discord.RichEmbed()
											.setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
											.setColor('#00ff00')
											.setDescription("Thanks for your suggestion, i've taken it into consideration and i believe it could actually be a \"good\" command\nI've also taken the liberty of pinning it somewhere so i don't forget about it too.")
											.setTimestamp()
										message.reply('I tried to dm you this, but it appears your dm\'s are closed',{apro1});
										});
									}
									if(r.emoji.name === '❎') {//:negative_squared_cross_mark:
										mw.reactions.forEach(r => {
											r.remove();
										});
										embed.setColor("#ff0000")
										embed.setTimestamp()
										embed.setFooter(`Denied`,client.users.get("377271843502948354").displayAvatarURL)
										mw.edit(embed);
										mw.channel.send(`Why did you deny this request?`)
										.then((me) => {
										mw.channel.awaitMessages(response => response.author.id === "377271843502948354", {
											max: 1,
											time: 1000*60*60,
											errors: ['time'],
										}).then((coll) => {
										let reason = coll.first().content;
											let den = new Discord.RichEmbed()
											.setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
											.setColor('#ff0000')
											.setDescription(reason)
											.setTimestamp()
											mw.channel.send(`I let them know the bad news`);
											message.author.send(den).catch(() => {
											let deni = new Discord.RichEmbed()
											.setAuthor('Thank You',client.users.get("377271843502948354").displayAvatarURL)
											.setColor('#ff0000')
											.setDescription(reason)
											.setTimestamp()
											mw.channel.send(`I let them know the bad news`);
											message.reply('I tried to dm you this, but it appears your dm\'s are closed',{deni});
											});
										})
										});
									}
							})
							collector.on('end', () => {
									mw.reactions.forEach(r => {
										r.remove();
									});
									embed.setColor("#fff000")
									embed.setTimestamp()
									embed.setFooter(`Missed`,client.users.get("377271843502948354").displayAvatarURL)
									mw.edit(embed);
							});
				});
				
			}
		}).catch(() => {
			m.edit('Command suggestion Disgarded [Timed out]');
		});
		});
	}
}
