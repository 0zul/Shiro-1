const request = require("request").defaults({ encoding: null });
const isURL = require("is-url");
const Discord = require("discord.js");

module.exports = {
  path: '../../commands/Misc/screenshot.js',
  help: {
    name: "screenshot",
    alias: 'sc'
  },
  run: async (client, message) => {
    let link = message.content.split(' ').slice(1,2).join(' ');
    let url = isURL(link) ? link : `https://${link}`;
  
     if(link) {
        message.channel.startTyping();
  //const url = isURL(args[0]) ? args[0] : `http://${args[0]}`;
        const screenshot = request(`https://image.thum.io/get/width/1920/crop/675/noanimate/${url}`);
        const screenshotEmbed = new Discord.RichEmbed()
        //.setColor('#000000')
        //.setTitle(url)
        //.setURL(url)
        //.attachFiles([{
        //  attachment: screenshot,
        //  name: "screenshot.png"
        //}])
        //.setImage("attachment://screenshot.png");
        //message.channel.send(screenshotEmbed);
        message.channel.send(new Discord.Attachment(screenshot,`${url}-screenshot.png`));
     } else {
      return message.channel.send('Useage: screenshot <website>');
     }
      message.channel.stopTyping();   
  }
};