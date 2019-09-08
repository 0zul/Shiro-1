module.exports = (client) => {
    client.on('warn', console.warn);

    client.on('error', console.error);

    client.on('ready', () => {
        console.log(`${client.user.username} is online`);
        client.user.setActivity(`over ${(client.users.size).toLocaleString()} users`, { type: "WATCHING" });
        });
    
    client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));
    
    client.on('reconnecting', () => console.log('I am reconnecting now!'));
    
    client.on('resume', () => console.log('I have reconnected!')); 
    
    client.on('guildCreate', (guild) => {
        let channel = client.channels.get('506318877266018304');//logChannel
        channel.send(`I have joined the guild ${guild.name}`);
        });                                                                                      //^^if you change the default prefix, make sure you change it here too
                                                                                                //ps. if you change it here, you need to change it in the reset cmd too
            
    client.on('guildDelete', (guild) => {
        let channel = client.channels.get('506318877266018304');//logChannel
        channel.send(`I have left the guild ${guild.name}`);
        });
}