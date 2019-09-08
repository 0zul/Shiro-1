const exec = require('child_process').exec;
const Discord = require('discord.js');

module.exports.run = async(client, message) => {
let a = message.content.split(' ').slice(1).join(' ');
if(a.includes('exec'))a = message.content.split(' ').slice(2).join(' ');

  if(message.author.id !== '377271843502948354')return message.channel.send("Sorry, the `exec` command can only be executed by the Developer.");
    exec(`${a}`, (error, stdout) => {
      const response = (error || stdout);
      let embed = new Discord.RichEmbed()
      .setTitle(`Executed in ${Math.round(client.ping)}ms`)
      .setColor(message.member.displayHexColor)
      .addField("Input", `\`\`\`asciidoc\n${a}\n\`\`\``)
      .addField("Output", `\`\`\`js\n${response}\n\`\`\``)
      message.channel.send({embed});
    });
}
module.exports.path = "../../commands/Owner/exec.js";
module.exports.help = {
name: "exec"
}