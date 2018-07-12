const Discord = module.require("discord.js");
const YTDL = require("ytdl-core");
module.exports.run = async (bot,message,args) => {
    if (!message.member.voiceChannel){
        message.channel.sendMessage("Please Join a voice Channel");
        return;
    }
    var sbpump = new Discord.RichEmbed()
        .setTitle("Playing Paradox Prime Cut")
        .setColor(0x00e6dc)
        message.channel.sendEmbed(sbpump);
   
    const streamOptions = { seek: 0, volume: 1 };
    var voiceChannel = message.member.voiceChannel;
            voiceChannel.join().then(connection => {
                console.log("joined channel");
                const stream = YTDL('https://www.youtube.com/watch?v=mli3Wt6k584&feature=youtu.be', { filter : 'audioonly' });
                const dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.on("end", end => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
}

module.exports.help = {
    name: "sbprime"
}