let discord = require('discord.js');

let map = new Map([
//Don't count on it
[0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPWBkK-oP1u0GFpz8LAmXpY9CSI0cyyrRHdHkciepxnWQTXxrR'],
//Signs point to yes
[1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9t68D_DGxuYYcvoKYm9Z6UhjKLY8tLUdlrXS5Vcbk4rmPT7l'],
//yes
[2,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyAsP_dXsiMZ1fJjTuPNsTzsxAor6KmB4Qqn_Di8AFJ8nbEicB'],
//no doubt about it
[3,'https://i.ytimg.com/vi/VZ0AvhGJpz4/hqdefault.jpg'],
//better not tell u now
[4,'https://cdn.britannica.com/82/191982-131-D3194343.jpg'],
//outlook not so good
[5,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ihuWZvLwxezMzwvkZT_qomuvxYCs6E9PU8EO3Roy24LUMvPwBw']
]);

module.exports.run = (client,message) => {
let question = message.content.split(' ').slice(1).join(' ');

let num = Math.round(Math.random() * 5);
let img = map.get(num);

let embed = new discord.RichEmbed()
.setTitle('Magic 8 ball:')
.addField('**Question:**',question)
.addField('**Answer:**',"󠀀󠀀󠀀󠀀󠀀󠀀󠀀")
.setImage(img)
message.channel.send(embed)

}
module.exports.path = "../../commands/Misc/8ball.js";
module.exports.help = {
name: "8ball"
}