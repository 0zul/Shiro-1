exports.run = (client,message) => {
let url = message.content.split(' ').slice(1).join(' ');
if(url[0].toLowerCase() == 'p'||url[0].toLowerCase() == 'play')url = message.content.split(' ').slice(2).join(' ');
//gotta define the possible link or songname^
//i did it that way so if the user mentions the bot	and tries to play the song, then the url would move a space over
//EX: @botto play senzawa => if it wasn't like this it woyld read as 'play senzawa'
//..play senzawa reads as 'senzawa', so das gud ... doubl spaces are bad tho and since this is just an example ... i don't need to make a space remover
	client.music.play(client,message,url);
//there are options, but that's in the 'Music(with-options)' folder 
}
exports.help = {
	name: "play",
	alias: "p"
}