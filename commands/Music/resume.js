exports.run = (client,message) => {
	
	client.music.resume(client,message);
	
}
exports.help = {
	name: "resume"
}