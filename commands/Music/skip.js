exports.run = (client,message) => {
	
	client.music.skip(client,message);
	
}
exports.help = {
	name: "skip"
}