exports.run = (client,message) => {
	
	client.music.stop(client,message);
	
}
exports.help = {
	name: "stop"
}