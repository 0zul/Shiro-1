const Discord = require("discord.js");
const request = require('snekfetch');
const fs = require('fs');
const parseTime = function(milliseconds) {
    var seconds = Math.floor(milliseconds/1000); milliseconds %= 1000;
    var minutes = Math.floor(seconds/60); seconds %= 60;
    var hours = Math.floor(minutes/60); minutes %= 60;
    var days = Math.floor(hours/24); hours %= 24;
    var weeks = Math.floor(days/7); days %= 7;
    var years = Math.floor(days/365); days %= 365;
    var decades = Math.floor(years/10); years %= 10;
    var centuries = Math.floor(decades/10); decades %= 10;
    var written = false;
    return(centuries?(written=true,`${centuries === 1 ? centuries+" Century" : centuries+" Centuries"}`):"")+(written?", ":"")
      +(decades?(written=true,`${decades == 1 ? decades+" Decade" : decades+" Decades"}`):"")+(written?", ":"")
      +(years?(written=true,`${years === 1 ? years+" Year" : years+" Years"}`):"")+(written?", ":"")
      +(weeks?(written=true,`${weeks === 1 ? weeks+" Week" : weeks+" Weeks"}`):"")+(written?", ":"")
      +(days?(written=true,`${days === 1 ? days+" Day" : days+" Days"}`):"")+(written?", ":"")
      +(hours?(written=true,`${hours == 1 ? hours+" Hour" : hours+" Hours"}`):"")+(written?", ":"")
      +(minutes?(written=true,`${minutes === 1 ? minutes+" Minute" : minutes+" Minutes"}`):"")+(written?", ":"")
      +(seconds?(written=true,`${seconds === 1 ? seconds+" Second" : seconds+" Seconds"}`):"")+(written?" ":"");
};
function map(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
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
let hexToRgb = function(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})` : null;
};
let randomHex = function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
 };
let randomRGB = function(){
return hexToRgb(randomHex());
};
function generateKey(length) {
    const tokens = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890._-=+';
    let keyOut = '';
    for (let i = 0; i < length; i++) {
			const random = Math.floor((Math.random() * 65) + 1);
			const char = tokens.charAt(random);
			keyOut += char;
	}
    return keyOut;
}
let f2c = function(num) {
return (num +'°F = '+ Math.round(((num-32)*5)/9) +'°C');
};
function generateNumber(length) { 
return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1)); 
};
function stringToBinary(str, spaceSeparatedOctets) {
    function zeroPad(num) {
        return "00000000".slice(String(num).length) + num;
    }

    return str.replace(/[\s\S]/g, function(str) {
        str = zeroPad(str.charCodeAt().toString(2));
        return !1 == spaceSeparatedOctets ? str : str + " "
    });
};
function binaryToString(str) {
    str = str.replace(/\s+/g, '');
    str = str.match(/.{1,8}/g).join(" ");

    var newBinary = str.split(" ");
    var binaryCode = [];

    for(let i = 0; i < newBinary.length; i++) {
        binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
    }
    return binaryCode.join("");
};
const parseSongTime = async function(songtime) {
    var seconds = songtime.seconds;
    var minutes = songtime.minutes;
    var hours = songtime.hours;
    var days = songtime.days;
    var weeks = songtime.weeks;
    var months = songtime.months;
    var years = songtime.years;
    var written = false;
    return(years?(written=true, years+"yr"):"")+(written?":":"")
      +(months?(written=true, months+"mo"):"")+(written?":":"")
      +(weeks?(written=true, weeks+"w"):"")+(written?":":"")
      +(days?(written=true, days+"d"):"")+(written?":":"")
      +(hours?(written=true, hours+"h"):"")+(written?":":"")
      +(minutes?(written=true, minutes+"m"):"")+(written?":":"")
      +(seconds?(written=true, seconds+"s"):"")+(written?"":"");
};
const longify = require('nekos-longify-function');

module.exports.run = async (client,message,args,serverQueue) => {
let getUser = async function(userid){
let usr = await client.fetchUser(userid);
return usr;
}
getUser(468400748040814604)
client.owner = client.users.get("377271843502948354");
if(message.author.id !== client.owner.id)return;
try{
      const code = message.content.split(" ").slice(1).join(" ");
      if(!code)return message.channel.send('i *do* need smth to eval, right?');
      let evaled = require("util").inspect(eval(code), { depth: 0 });
	
if(evaled.length > 1024){
fs.writeFile("./output.txt",(evaled), (err) => {
if (err) console.log(err)
});
return message.channel.send('ayy ... the output was longer than 1024 in length, so i put it in this file ... yw',{file: './output.txt'});
};
	
    //if(code.includes('client.token'))return;
    
	
     let evbed = new Discord.RichEmbed()
     .setTimestamp()
     .setColor(randomHex())
     .addField('**Input:**', '```js\n'+ code +'```')
	   .addField('**Output:**', '```js\n'+ evaled +'```')
     .addField('**Type:**', '```js\n'+ typeof eval(code) +'```')
     .setFooter(`Evaled in ${Math.round(client.ping)}ms`, client.user.avatarURL)
      message.channel.send(evbed);
    
	} catch (err) {
    let errbed = new Discord.RichEmbed()
  .setColor(0xff0000)
	.setTimestamp()
	.addField('**Error:**', '```js\n'+ err +'```')
    message.channel.send(errbed);
    }


}
module.exports.path = "../../commands/Owner/eval.js";
module.exports.help = {
    name: "eval",
    alias: "evaluate",
    type: "Master",
    info: "Evaluates code",
    perms: "BOT_OWNER",
    useage: "<code>"
  }