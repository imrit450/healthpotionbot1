const Discord = module.require("discord.js");
const api = "https://jsonplaceholder.typicode.com/posts";
const snekfetch = require("snekfetch");

module.exports.run = async (bot,message,args) => {
    snekfetch.get(api).then(r => {
        let body = r.body;
        let id = Number(args[0]);
        if(!id) return message.channel.send("Supply an ID!");
        if(isNaN(id)) return message.channel.send("Supply a valid number!");

        let entry = body.find(post => post.id === id);
        console.log(entry);
    });
}

module.exports.help = {
    name: "api"
}