const Discord = module.require("discord.js");
const agree ="✅"
const disagree ="❎"
module.exports.run = async (bot,message,args) => {
   
    let msg = await message.channel.send(message.author.toString() + " Vote! " + message.content.split("-hp vote"));
    await msg.react(agree);
    await msg.react(disagree);

    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 30000});
    message.channel.send(`Voting Complete!  ${message.content.split("-hp vote")} \n\n${agree}: ${reactions.get(agree).count-1}\n\n${disagree}: ${reactions.get(disagree).count-1}`);
}

module.exports.help = {
    name:"vote"
}