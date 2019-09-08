const { Canvas } = require("canvas-constructor");
const superagent = require('superagent');
const Discord = require("discord.js");
const db = require('quick.db');
const points = new db.table('POINTS');
const levels = new db.table('LEVELS');
const xpl = new db.table("TOTAL_POINTS");
const colors = new db.table('COLORS');
const levelson = new db.table('LEVELSON');

function intlFormat(num)
{
  return new Intl.NumberFormat().format(Math.round(num*10)/10);
}
function makeFriendly(num)
{
  if(num >= 1000000)
    return intlFormat(num/1000000)+'M';
  if(num >= 1000)
    return intlFormat(num/1000)+'k';
  return intlFormat(num);
}
function map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
module.exports = async (client,message) => {
var member = message.mentions.members.first()||message.member;

colors.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if(i == null||i === undefined) colors.set(`${message.guild.id}_${message.author.id}`, "#aaaaaa");
  });

levelson.fetch(`${message.guild.id}`).then(i => {
    if (i == null||i == undefined||i === 0)levelson.set(`${message.guild.id}`, "false");
  });

levels.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
    if (i == null || i === 0) levels.set(`${message.guild.id}_${member.user.id}`, 1);
  });
  
  points.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
    if (i == null) points.set(`${message.guild.id}_${member.user.id}`, 0);
  });
  
  xpl.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
    if (i == null) xpl.set(`${message.guild.id}_${member.user.id}`, 0);
  });
let elvl = await levelson.fetch(`${message.guild.id}`);
if(elvl === "false")return message.reply("I'm sorry, but it appears that the levelSystem is `Disabled` for this server");

var l;
var p;
var widthXP;
var pos = 0;
var bgColor = "#000000";
var color = "#aaaaaa";
var colorStatus = "#44b37f";  
levels.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
  l = i;
});

points.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
  widthXP = map(i, 0, l*300, 0, 600);
  p = i;
});

xpl.startsWith(`${message.guild.id}_`, {
  sort: '.data'
}).then(async resp => {
  var i = 0;
  for (i in resp) {
let u = await client.fetchUser(resp[i].ID.split('_')[1]);
    if(u.id == member.user.id) {
      pos = parseInt(i, 10) + 1;
    }
  }
});

if(widthXP > 600)widthXP = 600;

var colorRank;
colors.fetch(`${message.guild.id}_${member.user.id}`).then(i => {
  colorRank = i;
});

if(colorRank == "#000000"){
let color = "#2f3136";
let bgColor = "#aaaaaa";
} else {
let color = "#aaaaaa";
let bgColor = "#000000";
}

if(member.presence.status === 'idle') colorStatus = "#faa61a";
if(member.presence.status === 'offline') colorStatus = "#747f8d";
if(member.presence.status === 'dnd') colorStatus = "#f04747";

          var namam = member.user.username 
          var jadim = namam.length > 12 ? namam.substring(0, 10) + "..." : namam;
          async function createCanvas() {
          var imageUrlRegex = /\?size=2048$/g;
              
          var {body: avatar} = await superagent.get(member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128"));
           
          let ctx = new Canvas(934, 282);
          return new Canvas(934, 282)
          .setColor("#2f3136")
          .addRect(0, 0, 934, 282)
          .setColor(bgColor)
          .addRect(24, 33.5, 885, 212)
			    //writing
				      //username and discrim
          .setTextFont("36px Arial")
          .setColor(color)
          .setTextAlign("start")
          .addText(`${member.user.username}`, 264, 164)
          .setTextFont("italic 25px Arial")
          .setColor("#424751")
          .setTextAlign("center")
          .addText(`#${member.user.discriminator}`, ctx.measureText(`${member.user.username}`).width * 3 + 325, 164)
				      //level
          .setTextFont("bold 55px Arial")
          .setColor(colorRank)
          .setTextAlign("end")
          .addText(l, 934 - 50, 90)
          .setTextFont("bold 23px Arial")
          .addText("LEVEL", 934 - 55 - (ctx.measureText(l).width * 5), 90)
				      //rank
          .setTextFont("bold 55px Arial")
          .setColor(color)
          .setTextAlign("end")
          .addText(`#${pos}`, 934 - 70 - (ctx.measureText(l).width * 5) - (ctx.measureText(`LEVEL`).width * 2.5), 90)
          .setTextFont("bold 23px Arial")
          .addText("RANK", 934 - 110 - (ctx.measureText(l).width * 5) - (ctx.measureText(`LEVEL`).width * 2.5) - (ctx.measureText(pos).width * 5), 90)
				      //points
          .setTextFont("bold 26px Arial")
          .setTextAlign("start")
          .setColor(colorRank)
          .addText(makeFriendly(p), 700, 165)
          .setColor("#424751")
          .addText(`/ ${makeFriendly(l*300)} XP`, 700 + ctx.measureText(p).width * 2 + 15, 165)
			    //bar stuff
				      //under-bar
          .beginPath()
          .setColor("#424751")
          .arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true)
          .fill()
          .addRect(257+18.5, 147.5+36.25, (600), 37.5)
          .arc(257 + 18.5 + (600), 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false)
          .fill()
				      //completion meter
          .beginPath()
          .setColor(colorRank)
          .arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true)
          .fill()
          .addRect(257+18.5, 147.5+36.25, (widthXP), 37.5)
          .arc(257 + 18.5 + (widthXP), 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false)
          .fill()
          //avatar stuff
				        //under circle
          .setColor("#23272a")
          .addCircle(125,140,85)
                //pfp
          .addRoundImage(avatar, 40, 55, 170, 170, 85)
                //statusOutline
          .setColor("#000000")
          .addCircle(181.5,197.5,22)
                //status
          .setColor(colorStatus)
          .addCircle(182,198,20)
            .toBufferAsync()
            }
  message.channel.send(new Discord.Attachment(await createCanvas()));
 //})
}