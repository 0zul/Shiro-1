const Discord = require('discord.js');
const db = require('quick.db');
const colors = new db.table('COLORS');

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
if(r<0||r>255)r=0;
if(g<0||r>255)g=0;
if(b<0||r>255)b=0;
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
let randomHex = function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
 };

exports.run = async (client,message) => {
let msg = message.content.split(' ').slice(1).join(' ');
let rmg = message.content.split('(').slice(1).join(' ');
let color = msg.replace(/\s+/g, "");
let rcolor = rmg.split(")")[0];
let acolors = rcolor.split(",");

var rankColor;
var colora;
if(color.startsWith("rgb(")||color.startsWith("rgba(")||color.startsWith("(")){
rankColor = await rgbToHex(parseInt(acolors[0]),parseInt(acolors[1]),parseInt(acolors[2]));
}
if(!color.startsWith("#")&&!color.startsWith("rgb(")&&!color.startsWith("rgba(")&&!color.startsWith("(")) {
      colora = "#" + color;
      rankColor = colora;
    }
if(color.startsWith("#")){
      colora = color;
      rankColor = colora;
    }
if(color.toLowerCase() == "random"){
rankColor = await randomHex();
}
if(rankColor.length !== 7)return message.channel.send('Please enter a valid Hex or RGB color code');

let embed = new Discord.RichEmbed()
.setColor(rankColor)
.setDescription('Successfully set your "rankcard" color to '+ rankColor +'');

colors.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
 if(i == null||i == undefined){
colors.set(`${message.guild.id}_${message.author.id}`, rankColor);
message.channel.send(embed);
    } else {
colors.set(`${message.guild.id}_${message.author.id}`, rankColor);
message.channel.send(embed);
   }
 });
}
module.exports.path = "../../commands/XP/setcolor.js";
exports.help = {
name: "setcolor",
alias: "setrankcolor"
}