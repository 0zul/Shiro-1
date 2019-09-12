const request = require("request").defaults({ encoding: null });
const Discord = require("discord.js");
const convert = require('color-convert');

let randomHex = function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
 };


module.exports = {
  path: '../../commands/Fun/color.js',
  help: {
    name: "color",
    alias: 'colour'
  },
  run: async (client, message) => {
    let colour = message.content.replace( /  +/g, ' ').split(' ').slice(1).join(' ');
    
	  let color = function(string){
	      if(string.toLowerCase().includes("random"))string=string.replace("random",randomHex())
		    let rmg = string.split('(').slice(1).join(' ');
		    let rcolor = rmg.split(")")[0];
		    let acolors = rcolor.split(",");
		    let h = string.includes("#") ? true : false;
		    let r = string.toLowerCase().includes("rgb(") ? true : false;
		    let s = string.toLowerCase().includes("hsl(") ? true : false;
		    let v = string.toLowerCase().includes("hsv(") ? true : false;
		    let m = string.toLowerCase().includes("cmyk(") ? true : false;
		    let c = [];
		
		    if(h==true){//string.split("#")[1]
			      c.push(convert.rgb.hex(convert.hex.rgb(string)));
			      c.push(`${convert.hex.rgb(string)}`);
			      c.push(convert.rgb.hsl(convert.hex.rgb(string)));
			      c.push(convert.rgb.hsv(convert.hex.rgb(string)));
			      c.push(convert.rgb.cmyk(convert.hex.rgb(string)));
		    }
		    if(r==true){
			      c.push(convert.rgb.hex([acolors[0], acolors[1], acolors[2]]));
			      c.push(string.split("(")[1].split(")")[0]);
			      c.push(convert.rgb.hsl([acolors[0], acolors[1], acolors[2]]));
			      c.push(convert.rgb.hsv([acolors[0],acolors[1],acolors[2]]));
			      c.push(convert.rgb.cmyk([acolors[0],acolors[1],acolors[2]]));
		    }
		    if(s==true){
			      c.push(convert.rgb.hex(convert.hsl.rgb([acolors[0],acolors[1],acolors[2]])));
			      c.push(convert.hsl.rgb([acolors[0],acolors[1],acolors[2]]));
			      c.push(string.split("(")[1].split(")")[0]);
			      c.push(convert.hsl.hsv([acolors[0],acolors[1],acolors[2]]));
			      c.push(convert.rgb.cmyk(convert.hsl.rgb([acolors[0],acolors[1],acolors[2]])));
		    }
		    if(v==true){
			      c.push(convert.rgb.hex(convert.hsv.rgb([acolors[0],acolors[1],acolors[2]])));
			      c.push(convert.hsv.rgb([acolors[0],acolors[1],acolors[2]]));
			      c.push(convert.hsv.hsl([acolors[0],acolors[1],acolors[2]]));
			      c.push(string.split("(")[1].split(")")[0]);
			      c.push(convert.rgb.cmyk(convert.hsv.rgb([acolors[0],acolors[1],acolors[2]])));
		    }
		    if(m==true){
			      c.push(convert.rgb.hex(convert.cmyk.rgb([acolors[0],acolors[1],acolors[2],acolors[3]])));
			      c.push(convert.cmyk.rgb([acolors[0],acolors[1],acolors[2],acolors[3]]));
			      c.push(convert.rgb.hsl(convert.cmyk.rgb([acolors[0],acolors[1],acolors[2],acolors[3]])));
			      c.push(convert.rgb.hsv(convert.cmyk.rgb([acolors[0],acolors[1],acolors[2],acolors[3]])));
			      c.push(convert.rgb.cmyk(convert.cmyk.rgb([acolors[0],acolors[1],acolors[2],acolors[3]])));
		    }
        if(h==false&&r==false&&s==false&&v==false&&m==false){
            c.push(undefined);
        }
	      return c;
	    }

    const colorHex = color(colour)[0];
    if(colorHex==undefined)return message.channel.send("Please enter a valid color\nEX:```\ncolor #00d6ff\ncolor rgb(0,214,255)\ncolor hsl(190,100,50)\ncolor hsv(190,100,100)\ncolor cmyk(100,16,0,0)```");
    const colorcube = request(`http://placehold.it/250/${colorHex}/${colorHex}`);
        const embed = new Discord.RichEmbed()
        .setColor(`#${colorHex}`)
        .setDescription(`**Hex:** \`#${color(colour)[0]}\`\n**RGB:** \`${color(colour)[1]}\`\n**HSL:** \`${color(colour)[2]}\`\n**HSV:** \`${color(colour)[3]}\`\n**CMYK:** \`${color(colour)[4]}\``)
        .attachFiles([{
          attachment: colorcube,
          name: `${colorHex}.png`
        }])
        .setImage(`attachment://${colorHex}.png`);
        message.channel.send(embed);   
  }
};
