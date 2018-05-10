const Discord = module.require("discord.js");
const YTDL = require("ytdl-core");
var servers = {};

module.exports.run = async (bot,message,args) => {
    var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.sendMessage("Music has been Skipped");
}
module.exports.help = {
    name: "skip"
}