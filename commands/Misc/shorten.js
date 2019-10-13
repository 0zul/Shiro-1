const shorten = require('isgd');

module.exports = {
  path: '../../commands/Fun/shorten.js',
  help: {
    name: 'shorten',
    category: 'Utilities',
    description: 'Shortens a given URL using is.gd',
    usage: 'shorten <URL> [title]'
},
  run: async (client, message) => { // eslint-disable-line no-unused-vars
	    let link = message.content.replace( /  +/g, ' ').split(' ').slice(1,2).join(" ");
      let title = message.content.replace( /  +/g, ' ').split(' ').slice(2,3).join(" ");
      if(link.toLowerCase() === "shorten"){
          link = message.content.replace( /  +/g, ' ').split(' ').slice(2,3).join(" ");
          title = message.content.replace( /  +/g, ' ').split(' ').slice(3,4).join(" ");
      }
      if (!link)return message.channel.send('**Proper Usage: !shorten <URL> [title]**')
      if (!title) {
          shorten.shorten(link, function(res) {
              if (res.startsWith('Error:')) return message.channel.send('**Please enter a valid URL**');
              message.channel.send(`**<${res}>**`);
          })
      } else {
          shorten.custom(link, title, function(res) {
              if (res.startsWith('Error:')) return message.channel.send(`**${res}**`);
              message.channel.send(`**<${res}>**`);
          })
      }
  }
}
