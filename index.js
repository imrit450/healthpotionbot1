const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const botsettings = require("./botsettings.json");
const fs = require("fs");

const TOKEN = botsettings.TOKEN;
const PREFIX = botsettings.PREFIX;
var bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) =>{
    if(err) console.error(err);

    let jsfiles = files.filter(f=>f.split(".").pop() === "js");
    if(jsfiles.length <=0){
        console.log("No Commands to load");
        return;
    }
    console.log(`Loading ${jsfiles.length} commands!`);
    jsfiles.forEach((f, i)=> {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async() => {
    console.log('Ready');

});
bot.on("message", async message => {
   
    bot.user.setStatus('Online');
    bot.user.setGame('with Ismail ( ͡° ͜ʖ ͡°)');
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
   
    if (message.author.equals(bot.user))return;
    if (!message.content.startsWith(PREFIX)) return;
    
    let cmd = bot.commands.get(args[0]);
    if(cmd) cmd.run(bot, message , args);
    if(!cmd) message.channel.sendMessage("Invalid Command: Do '-hp help' for All commands.");   
});

bot.login(botsettings.TOKEN);