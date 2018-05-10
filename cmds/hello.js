const Discord = module.require("discord.js");
module.exports.run = async (bot,message,args) => {
        message.channel.sendMessage("Sup, " + message.author.toString());
}
module.exports.help = {
    name: "hello"
}