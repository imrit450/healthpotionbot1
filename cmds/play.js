const Discord = module.require("discord.js");
const YTDL = require("ytdl-core");
var servers = {};

module.exports.run = async (bot,message,args) => {
    function play(connection, message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on("end", function(){
            if (server.queue[0]) play(connection, message);
            else connection.disconnect();
        });
    };
    if (!args[1]){
        message.channel.sendMessage("Please Provide a link");
        return;
    }
    if (!message.member.voiceChannel){
        message.channel.sendMessage("Please Join a voice Channel");
        return;
    }
    
    if(!servers[message.guild.id]) servers[message.guild.id] = {
       queue: []
   };
    
    var server = servers[message.guild.id];
    server.queue.push(args[1]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
});
}
module.exports.help = {
    name: "play"
}