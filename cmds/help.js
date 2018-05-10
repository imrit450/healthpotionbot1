const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) => {
    var help = new Discord.RichEmbed()
        .setTitle("Commands for HP Bot")
        .addField("ping" , "Will return Pong if bot is online")
        .addField("smk", "Check if you're worth")
        .addField("info", "Information about me")
        .addField("Vote", "Starts a vote with Yes or No")
        .addField("ask", "Ask a question and it will return an answer")
        .addField("sbpump", "Bouss Liki ar pump")
        .setColor(0x00e6dc)
        message.channel.sendEmbed(help);
}

module.exports.help = {
    name: "help"
}