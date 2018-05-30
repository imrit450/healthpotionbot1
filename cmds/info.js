const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) => {
    
    message.channel.sendMessage("I'm the Android of the Supreme Leader Thresh");
}

module.exports.help = {
    name: "info"
}