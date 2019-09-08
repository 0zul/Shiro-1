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
levels.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
  l = i;
});

points.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
  widthXP = map(i, 0, l*300, 0, 400);
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

if(widthXP > 380)widthXP = 380;
 async function createCanvas() {
          var imageUrlRegex = /\?size=2048$/g;
              
          var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
           
          let ctx = new Canvas(400, 180);
          return new Canvas(400, 180)
            //background
		  .setColor("#202225")
          .addRect(0, 0, 400, 180)
		  .setColor(colorRank)
          .addRect(0, 0, (widthXP), 180)
		  .setColor("#4c4c4c")
          .addRect(15, 15, 370, 150)
           //writings
            //Rank
          .beginPath()
          .setColor("#202225")
          .addRect(160, 35, 148, 32)
          .setColor("#aaaaaa")
          .setTextFont('20px System')
          .addText(`Rank: #${pos}`, 180, 57)
          .fill()
            //level
          .beginPath()
          .setColor("#202225")
          .addRect(165, 75, 128, 32)
          .setColor(colorRank)
          .setTextFont('20px System')
          .addText(`level: ${l}`, 185, 97)
          .fill()
            //xp
          .beginPath()
          .setColor("#202225")
          .addRect(160, 115, 148, 32)
          .setColor("#aaaaaa")
          .setTextFont('20px System')
          .addText(`XP:`, 180, 137)
          .setColor(colorRank)
          .setTextFont('10px System')
          .addText(`${(p).toLocaleString()}`, 200 + ctx.measureText("XP:").width, 135)
          .setColor("#aaaaaa")
          .setTextFont('10px System')
          .addText(`/ ${(l*300).toLocaleString()}`, 220 + ctx.measureText(`${(p).toLocaleString()}`).width, 135)
          .fill()
           //shadow around pfp
          .setShadowColor("rgba(22, 22, 22, 1)")
          .setShadowOffsetY(5)
          .setShadowBlur(10)
          .addCircle(84, 90, 52)
            //pfp
          .addRoundImage(avatar, 30, 36, 108, 108, 54)
          .save()
		    .toBuffer()
            }
  message.channel.send(new Discord.Attachment(await createCanvas()));

}