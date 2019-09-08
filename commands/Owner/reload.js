exports.run = async (client, message) => {

    let loadCommand = function(commandName) {
        try {
        let command;
        if(client.commands.has(commandName)) {
            command = client.commands.get(commandName);
        } else if (client.aliases.has(commandName)) {
            command = client.commands.get(client.aliases.get(commandName).help.name);
        }
            const props = require(command.path);
            if(props.init) {
                props.init(client);
            }
            client.commands.set(props.help.name, props);
            client.aliases.set(props.help.alias, props);
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    };

    let unloadCommand = async function(commandName) {
        let command;
        if(client.commands.has(commandName)) {
            command = client.commands.get(commandName);
        } else if (client.aliases.has(commandName)) {
            command = client.commands.get(client.aliases.get(commandName).help.name);
        }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

        const mod = require.cache[require.resolve(client.commands.get(command.help.name).path)];
        delete require.cache[require.resolve(client.commands.get(command.help.name).path)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    };

client.owner = client.users.get("377271843502948354");
if(message.author.id !== client.owner.id)return;
let cmd = message.content.split(" ").slice(1,2).join(" ");
if(cmd.toLowerCase() === "reload") cmd = message.content.split(" ").slice(2,3).join(" ");

if(!cmd)return message.channel.send("Must provide a command to reload. Derp.");

    let response = await unloadCommand(cmd);
    if (response) return message.channel.send(`Error Unloading: ${response}`);

    response = loadCommand(cmd);
    if (response) return message.channel.send(`Error Loading: ${response}`);

    message.channel.send(`The command \`${cmd}\` has been reloaded`);

};
module.exports.path = "../../commands/Owner/reload.js";
exports.help = {
    name: "reload",
    category: "bot Owner",
    description: "Reloads a command that\"s been modified.",
    usage: "reload [command]"
};