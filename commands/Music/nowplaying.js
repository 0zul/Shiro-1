exports.run = (client,message) => {
	
	client.music.nowplaying(client,message);
	
}
exports.help = {
	name: "nowplaying",
	alias: "np"
}