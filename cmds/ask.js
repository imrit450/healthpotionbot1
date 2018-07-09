const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) => {
    let answers = [
        "Yes <:pikaglance:460475587904012327>",
        "No",
        "Maybe <:pikaglance:460475587904012327>",
        "ehhhh Yes..maybe? 🤔",
        "ehhhh No..maybe? <:huh:460482102719283210>",
        "ummm what? why? 😐",
        "Idk m8, better ask Ismail 🙄",
        "Ofc Darling 😘",
        
    ];
    
    if ((message.author.id === '164643701342076928') && (message.content.endsWith("??"))) {(message.channel.sendMessage ("Ofc Darling 😘 "));}
        else
            if ((message.content.endsWith(".?")) && (message.author.id === '164643701342076928')) {message.channel.sendMessage("Yes <:pikaglance:460475587904012327>");}
                else
                     if (args[1]) message.channel.sendMessage(answers[Math.floor(Math.random(3342432341) * answers.length)]);
                        else message.channel.sendMessage("Ask me a question...");
}

module.exports.help = {
    name: "ask"
}