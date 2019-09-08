const { Canvas } = require("canvas-constructor");
const superagent = require('superagent');
const Discord = require("discord.js");
const db = require('quick.db');
const points = new db.table('POINTS');
const levels = new db.table('LEVELS');
const xpl = new db.table("TOTAL_POINTS");
const levelson = new db.table("LEVELSON");
const colors = new db.table('COLORS');

function map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
module.exports = async (client, message) => {
var member = message.mentions.members.first()||message.member;
let mew = message.content.split(' +').slice(1).join(' ');
let mw = mew.split(' ');

  levelson.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined||i === 0)levelson.set(`${message.guild.id}`, "false");
  });

  colors.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
    if(i == null||i == NaN||i == undefined||i === 0)colors.set(`${message.guild.id}_${member.user.id}`, "#aaaaaa");
  });

  levels.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
    if(i == null||i == NaN||i === 0)levels.set(`${message.guild.id}_${member.user.id}`, 1);
  });
  
  points.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
    if(i == null||i == NaN)points.set(`${message.guild.id}_${member.user.id}`, 0);
  });
  
  xpl.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
    if(i == null||i == NaN)xpl.set(`${message.guild.id}_${member.user.id}`, 0);
  });
 
let lvls = await levelson.fetch(`${message.guild.id}`);
if(lvls === "false")return message.channel.send("I'm sorry, but it appears that the levelSystem is `Disabled` for this server");

var l;
var p;
var widthXP;
var colorRank;
var pos = 0;
var colorStatus = "#44b37f"; 
levels.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
  l = i;
});

points.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
  widthXP = map(i, 0, l*300, 0, 100);
  p = i;
});

colors.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
colorRank = i;
});
  
xpl.startsWith(`${message.guild.id}_`, {
  sort: '.data'
}).then(resp => {
  var i = 0;
  for (i in resp) {
    if (client.users.get(resp[i].ID.split('_')[1]).id == member.user.id) {
      pos = parseInt(i, 10) + 1;
    }
  }
});

if(widthXP > 100)widthXP = 100;

if(member.presence.status === 'idle') colorStatus = "#faa61a";
if(member.presence.status === 'offline') colorStatus = "#747f8d";
if(member.presence.status === 'dnd') colorStatus = "#f04747";
	
 async function createCanvas() {
          var imageUrlRegex = /\?size=2048$/g;
              
          var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
           
          let ctx = new Canvas(400, 180);
          return new Canvas(400, 180)
            //background
		      .setColor("#202225")
          .addRect(0, 0, 400, 180)
          .beginPath()
		    //  .setShadowColor("#4c4c4c")
        //  .setShadowOffsetX(0)
        //  .setShadowOffsetY(0)
		    //  .setShadowBlur(10)
		      .setColor("#4c4c4c")
          .addRect(15, 15, 370, 150)
          .fill()
           //writings
            //Rank
          .beginPath()
            //.setColor("#202225")
            //.addRect(160, 35, 148, 32)
          .setColor("#aaaaaa")
          .setTextFont('20px System')
          .addText(`Rank: #${pos}`, 180, 57)
          .fill()
            //level
          .beginPath()
          .setColor("#202225")
          .addRect(160, 65, 140, 4)
          .setColor(colorRank)
          .setTextFont('20px System')
          .addText(`level: ${l}`, 185, 90)
          .setTextFont('10px System')
          .addText(`${(widthXP).toFixed(2)}%`, 185, 105)
          .setColor("#aaaaaa")
          .addText(`complete`, 187 + ctx.measureText(`${(widthXP).toFixed(2)}%`).width, 105)
          .fill()
            //xp
          .beginPath()
          .setColor("#202225")
          .addRect(160, 110, 140, 4)
          .setColor("#aaaaaa")
          .setTextFont('20px System')
          .addText(`XP:`, 180, 135)
          .setColor(colorRank)
          .setTextFont('10px System')
          .addText(`${(p).toLocaleString()}`, 200 + ctx.measureText("XP:").width, 135)
          .setColor("#aaaaaa")
          .setTextFont('10px System')
          .addText(`/ ${(l*300).toLocaleString()}`, 220 + ctx.measureText(`${(p).toLocaleString()}`).width, 135)
          .setColor(colorRank)
          .setTextFont('10px System')
          .addText(`${((l*300) - p).toLocaleString()}`, 170, 150)
          .setColor("#aaaaaa")
          .setTextFont('10px System')
          .addText(`XP until next level`, 175 + ctx.measureText(`${((l*300) - p).toLocaleString()}`).width, 150)
          .fill()
           //circle under pfp
          .setColor("#424751")
          .addCircle(86, 90, 46)
            //pfp
          .addRoundImage(avatar, 40, 44, 93, 93, 46)
		    //circle bar
          .beginPath()
		      .setShadowColor(colorStatus)
          .setShadowOffsetX(0)
          .setShadowOffsetY(0)
		      .setShadowBlur(5)
          .setStroke(colorStatus)
		      .setStrokeWidth(12)
		      .arc(86, 90.5, 55, Math.PI / -2, (Math.PI * 2) * 100 / 100 + (Math.PI / -2), false)
		      .stroke()
          .beginPath()
		      //.setShadowColor(colorRank)
          //.setShadowOffsetX(0)
          //.setShadowOffsetY(0)
		      //.setShadowBlur(10)
          .setStroke(colorRank)
		  .setStrokeWidth(10)
		  .arc(86, 90.5, 55, Math.PI / -2, (Math.PI * 2) * widthXP / 100 + (Math.PI / -2), false)
		  .stroke()
		.toBuffer()
            }
  message.channel.send(new Discord.Attachment(await createCanvas()));

}