const db = require('quick.db');
const points = new db.table('POINTS');
const levels = new db.table('LEVELS');
const xpl = new db.table("TOTAL_POINTS");
const colors = new db.table('COLORS');
const levelson = new db.table('LEVELSON');
const layouts = new db.table('LAYOUTS');
const map = new Map([
        [1, 'mee6'],
        [2, 'circlebar'],
        [3, 'outsideborderbar'],
        [4, 'insideborderbar']
      ]);
exports.run = async (client, message) => {
let a = message.content.split(' ').slice(1).join(' ');
let u = message.mentions.users.first()||client.users.get(a)||message.author;
if(!message.guild.members.get(client.user.id).permissions.has("ATTACH_FILES"))return message.channel.send("I need the ``ATTACH_FILES`` permission to send this");
layouts.fetch(`${message.guild.id}_${u.id}`).then(i => {
 if(i == null||i == NaN||i == undefined)layouts.set(`${message.guild.id}_${u.id}`, 1);
});
let i = await layouts.fetch(`${message.guild.id}_${u.id}`);
let curlayout = map.get(i);
require(`../../layouts/${curlayout}.js`)(client, message);

}
module.exports.path = "../../commands/XP/rank.js";
module.exports.help = {
  name: "rank",
 alias: "level" 
}