const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) => {
    let smkreplies = [
        "Ti cok flmm, ki pu souC ladan lmao 🤣",
        "I'll think about it 🤔 ",
        "Ehhh...no ty, go get a life darling 🤮",
        "New hentais just came out, go watch them virgin 🤭"  
    ];

    if (args[0]) message.channel.sendMessage(smkreplies[Math.floor(Math.random(3342432341) * smkreplies.length)]);
}

module.exports.help = {
    name: "smk"
}