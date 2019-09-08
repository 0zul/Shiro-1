module.exports.run = (client,message) => {
if(!message.member.permissions.has("MANAGE_ROLES"))return message.channel.send("nop");
if(!message.guild.members.get(client.user.id).permissions.has('MANAGE_ROLES'))return message.channel.send('I need the `MANAGE_ROLES` permission');

let color = message.content.split(' ').slice(1,2).join(' ');
let r = message.content.split(' ').slice(2,3).join(' ');
let role = message.guild.roles.find(ro => ro.name === r)||message.guild.roles.get(r);

if(!role)return message.channel.send('Invalid role');

role.setColor(color).then(() => {
message.channel.send(`Successfully set the color of role \`${role.name}\` to \`${color}\``)
}).catch(err => {
if(err)return message.channel.send(`\`Error\`\n${err}`);
});
}
module.exports.help = {
name: "rolecolor",
alias: "rc"
}