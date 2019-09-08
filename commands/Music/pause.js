exports.run = (client,message) => {
	
	client.music.pause(client,message);
	
}
exports.help = {
	name: "pause"
}