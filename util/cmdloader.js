const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

//wanna add a new command group? ell, ya gotta ad it here.
//i'll show you how

module.exports = async (client) => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();

    client.imageCommands = new Discord.Collection();
    client.miscCommands = new Discord.Collection();
    client.musicCommands = new Discord.Collection();
    client.moderationCommands = new Discord.Collection();
    client.ownerCommands = new Discord.Collection();
    client.xpCommands = new Discord.Collection();
//define the group here ... something like this:
//  client.group-nameCommands = new Discord.Collection();

const imgFiles = await readdir("./commands/Image/");
const miscFiles = await readdir("./commands/Misc/");
const musicFiles = await readdir("./commands/Music/");
const modFiles = await readdir("./commands/Moderation/");
const onrFiles = await readdir("./commands/Owner/");
const xpFiles = await readdir("./commands/XP/");
//define the group files here ... something like this:
//const short-group-nameFiles = await readdir("./commands/group-name/");


//finally the files ...try smth like this:
//
// short-group-nameFiles.forEach(f => {
//     if(!f.endsWith(".js"))return;
// 		let short-group-name = require(`../commands/group-name/${f}`);
//     client.group-nameCommands.set(short-group-name.help.name, short-group-name);
//     client.commands.set(short-group-name.help.name, short-group-name);
// 	   client.aliases.set(short-group-name.help.alias, short-group-name);
// }); 


//now you should've Successfully added your new command group ... have fun making the commands! ^~^
//PS. i hould've said up there^ but 'group-name' should be the folder name
xpFiles.forEach(f => {
    if(!f.endsWith(".js"))return;
		let xp = require(`../commands/XP/${f}`);
    client.xpCommands.set(xp.help.name, xp);
    client.commands.set(xp.help.name, xp);
	client.aliases.set(xp.help.alias, xp);
	});
imgFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
		let img = require(`../commands/Image/${f}`);
    client.imageCommands.set(img.help.name, img);
    client.commands.set(img.help.name, img);
	client.aliases.set(img.help.alias, img);
	});
miscFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
		let misc = require(`../commands/Misc/${f}`);
    client.miscCommands.set(misc.help.name, misc);
    client.commands.set(misc.help.name, misc);
	client.aliases.set(misc.help.alias, misc);
	});
musicFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
		let music = require(`../commands/Music/${f}`);
    client.musicCommands.set(music.help.name, music);
    client.commands.set(music.help.name, music);
	client.aliases.set(music.help.alias, music);
	});
modFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
		let mod = require(`../commands/Moderation/${f}`);
    client.moderationCommands.set(mod.help.name, mod);
    client.commands.set(mod.help.name, mod);
	client.aliases.set(mod.help.alias, mod);
	});
onrFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
		let onr = require(`../commands/Owner/${f}`);
    client.ownerCommands.set(onr.help.name, onr);
    client.commands.set(onr.help.name, onr);
	client.aliases.set(onr.help.alias, onr);
	});
console.log(`\nloaded ${client.commands.size} commands`);
console.log(`loaded ${client.aliases.size} aliases`);
}
