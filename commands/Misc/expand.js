const Bypasser = require('node-bypasser');

module.exports = {
  path: '../../commands/Fun/expand.js',
  help: {
	  name: 'expand',
	  category: 'Utilities',
	  description: 'Get the long URL that a short URL redirects to',
	  usage: 'expand [short URL]'
  },
  run: async (client, message) => {
       let link = message.content.replace( /  +/g, ' ').split(' ').slice(1,2).join(" ");
       if(link.toLowerCase() === "expand")link = message.content.replace( /  +/g, ' ').split(' ').slice(2,3).join(" ");
	     if (!link) return message.reply('Short URL to expand not given');
	     var w = new Bypasser(link);
	     w.decrypt(function(err, result) {
		     if (err) {
			     console.log(err);
			     message.channel.send('There was an error in expanding the URL');
			     return;
		     }
		    message.channel.send(`Short URL \`${link}\` goes to \`${result}\``);
	    });
  }
}

