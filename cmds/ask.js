const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) => {
    let answers = [
        "Yes",
        "No",
        "Maybe <:pikaglance:460475587904012327>",
        "ehhhh Yes..maybe? <:whytho:378183787600805889>",
        "ehhhh No..maybe? <:huh:460482102719283210>",
        "ummm what? why? <:wait:463468116014530571>",
        "Idk m8, better ask Ismail <:pepehigh:463046642140971009>",
        "Ofc Darling <:pepolove:414467473174298624>",
        
    ];
    
    if ((message.author.id === '164643701342076928') && (message.content.endsWith("??"))) {(message.channel.sendMessage ("Ofc Darling <:pepolove:414467473174298624>"));}
        else
            if ((message.content.endsWith(".?")) && (message.author.id === '164643701342076928')) {message.channel.sendMessage("Yes");}
                else
                     if (args[1]) message.channel.sendMessage(answers[Math.floor(Math.random(3342432341) * answers.length)]);
                        else message.channel.sendMessage("Ask me a question...");
}

module.exports.help = {
    name: "ask"
}