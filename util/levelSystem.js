const db = require('quick.db');
const points = new db.table('POINTS');
const levels = new db.table('LEVELS');
const xpl = new db.table("TOTAL_POINTS");
const colors = new db.table('COLORS');
const levelson = new db.table('LEVELSON');
const layouts = new db.table('LAYOUTS');
const talkedRecently = new Set();

module.exports = (client) => {
client.on('message', async message => { 
	if(message.author.bot)return;
	if(message.channel.type !== "text")return;

  let xpAdd = Math.floor(Math.random() * 7) + 8;

 layouts.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
 if(i == null||i == NaN||i == undefined)layouts.set(`${message.guild.id}_${message.author.id}`, 1);
 });

  colors.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if(i == null||i === undefined)colors.set(`${message.guild.id}_${message.author.id}`, "#aaaaaa");
  });
  
  levelson.fetch(`${message.guild.id}`).then(i => {
    if (i == null||i == undefined||i === 0)levelson.set(`${message.guild.id}`, "false");
  });

  levels.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null || i === 0)levels.set(`${message.guild.id}_${message.author.id}`, 1);
  });
  
  points.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null)points.set(`${message.guild.id}_${message.author.id}`, 0);
  });
  
  xpl.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null)xpl.set(`${message.guild.id}_${message.author.id}`, 0);
  });
let lvls = await levelson.fetch(`${message.guild.id}`);
if(lvls == "true"){
if (talkedRecently.has(message.author.id))return;

points.add(`${message.guild.id}_${message.author.id}`, xpAdd);
xpl.add(`${message.guild.id}_${message.author.id}`, xpAdd);
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 60000);
  points.fetch(`${message.guild.id}_${message.author.id}`).then(p => {
   levels.fetch(`${message.guild.id}_${message.author.id}`).then(l => {
      var xpReq = l * 300;
      if(p >= xpReq ) {
        levels.add(`${message.guild.id}_${message.author.id}`, 1);
        points.set(`${message.guild.id}_${message.author.id}`, 0);
        levels.fetch(`${message.guild.id}_${message.author.id}`, {"target": ".data"}).then(lvl => {
            message.channel.send(`GG <@${message.author.id}>, you just leveled up to a level **${lvl}**`).then(msg => {
             msg.delete(15000);
            });
        });
      }
    });
  });
}

 });
}