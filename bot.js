const Discord = require('discord.js');
const superagent = require('superagent');
const db = require('quick.db');
const request = require('request');
const prefixes = new db.table('PREFIXES');
const points = new db.table('POINTS');
const levels = new db.table('LEVELS');
const xpl = new db.table("TOTAL_POINTS");
const colors = new db.table('COLORS');
const levelson = new db.table('LEVELSON');
const urls = require('./urls/imageurls.js');
const api = require('nekos-moosik');
const apiKey = process.env.YTKEY;

const { TOKEN } = require('./config');
const queue = new Map();

const client = new Discord.Client();
client.owner = client.users.get("377271843502948354");
client.music = new api.musicClient(apiKey);

//pinger
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 60000);

require('./util/logs.js')(client);
require('./util/events.js')(client);
require('./util/cmdloader.js')(client);
require('./util/levelSystem.js')(client);

client.on('message', async message => { 
	if(message.author.bot)return;
	if(message.channel.type !== "text")return;

prefixes.fetch(`${message.guild.id}`).then(i => {
    if(i == null||i == NaN||i == undefined)prefixes.set(`${message.guild.id}`, "sk.");
  });
const p = await prefixes.fetch(`${message.guild.id}`);
const prefixMention = new RegExp(`^<@!?${client.user.id}>`);
const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : p;

  if(!message.content.startsWith(prefix))return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const serverQueue = queue.get(message.guild.id);

  let commandfile = client.commands.get(cmd);
  let alias = client.aliases.get(cmd);


  if(commandfile)commandfile.run(client,message,args);
  if(alias)alias.run(client,message,args);

 });

client.login(process.env.TOKEN);

//----------------------------------------------------------------------------\\

//image api
app.get('/api/v1/image/:tag.png', async function(request, response){
if(request.params.tag == "rickandmorty"){
let pic = urls.rickandmorty[Math.floor(Math.random() * urls.rickandmorty.length)];
response.set({
  'Content-Type': 'png',
  'link': pic
});
var {body: picc} = await superagent.get(pic);
response.send(new Buffer.from(picc));
  }
if(request.params.tag == "neko"){
let pic = urls.neko[Math.floor(Math.random() * urls.neko.length)];
response.set({
  'Content-Type': 'png',
  'link': pic
});
var {body: picct} = await superagent.get(pic);
response.send(new Buffer.from(picct));
  }
const requries = ["neko", "rickandmorty"];
if(!requries.some(word => request.params.tag.toLowerCase().includes(word))) {
response.status(404).json({ 
current_images:{
rickandmorty: urls.rickandmorty.length,
neko: urls.neko.length
}
})
}
});

app.get('/api/v1/image', (req, res) => {
res.status(404).json({current_images:{rickandmorty: urls.rickandmorty.length, neko: urls.neko.length}})
})

//image api
app.get('/api/v1/pvt/:tag', function(req, res){
if(req.params.tag == "subs"||req.params.tag == "subcount"||req.params.tag == "subscribers"){
      var icon, tseries, pewdiepie, info, pvst;
      request(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC-lHJZR3Gqxm24_Vd_AJ5Yw&key=${apiKey}`,
      function(err1, resp1, body1) {
            request(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCq-Fj5jknLsUf-MWSy4_brA&key=${apiKey}`,
            function(err2, resp2, body2) {
                  if (!err1 && resp1.statusCode === 200) pewdiepie = JSON.parse(body1).items[0].statistics.subscriberCount;
                  if (!err2 && resp2.statusCode === 200) tseries = JSON.parse(body2).items[0].statistics.subscriberCount;
                  //console.log(JSON.parse(body1).items[0]);
                  if (pewdiepie > tseries){
                   var winner = "PewDiePie";
                   var winsubs = pewdiepie
                   var loser = "T-Series";
                   var losesubs = tseries;
                   };
                  if (pewdiepie < tseries){
                   var winner = "T-Series";
                   var winsubs = tseries
                   var loser = "PewDiePie";
                   var losesubs = pewdiepie;
                   };
let diff = winsubs - losesubs;
if(winner === "PewDiePie"){
icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OrJf1Bm30NwfwwTys8uONbh1sV_csZuQoOHsBaxvyyYdtD4c"
} else {
icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBAGt2BY5GUWHTqIgQRDz1KtoOo22TzwCiaqPXHMfgAwzWE3zE"
}


res.jsonp({ 
curWinner: winner,
winnerSubs: winsubs,
winnerIcon: icon,
curLoser: loser,
loserSubs: losesubs,
subDifference: diff
 })
            });
      });
  }
});

//neons sub count
//app.get('/api/v1/subs/:tag',functions(req,res){
//  if(req.params.tag === "neon"){
     
// }
//});