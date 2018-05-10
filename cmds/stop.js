const Discord = module.require("discord.js");
const YTDL = require("ytdl-core");
var servers = {};


module.exports.run = async (bot,message,args) => {
    var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            message.channel.sendMessage("Music has been Stopped");
}
module.exports.help = {
    name: "stop"
}