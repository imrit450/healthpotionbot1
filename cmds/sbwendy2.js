const Discord = module.require("discord.js");
const YTDL = require("ytdl-core");
module.exports.run = async (bot,message,args) => {
    if (!message.member.voiceChannel){
        message.channel.sendMessage("Please Join a voice Channel");
        return;
    }
    var sbpump = new Discord.RichEmbed()
        .setTitle("Playing Wendy toem retard.mp3")
        .setColor(0x00e6dc)
        message.channel.sendEmbed(sbpump);
   
    const streamOptions = { seek: 0, volume: 1 };
    var voiceChannel = message.member.voiceChannel;
            voiceChannel.join().then(connection => {
                console.log("joined channel");
                const stream = YTDL('https://youtu.be/aF1e1ZGS1qg', { filter : 'audioonly' });
                const dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
}

module.exports.help = {
    name: "sbwendy2"
}