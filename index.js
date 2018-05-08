const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const botsettings = require("./botsettings.json");


const TOKEN = botsettings.TOKEN;
const PREFIX = botsettings.PREFIX;
var bot = new Discord.Client();
var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
};

let answers = [
    "Yes",
    "No",
    "Maybe",
    "How should i know?",
    "ummm what?",
    "Idk m8, better ask Ismail",
    "You serious?"
];
let smkreplies = [
    "Ti cok flmm, ki pu souC ladan lmao",
    "I'll think about it",
    "Ehhh, no ty get a life darling",
    "New hentais just came out, go watch them virgin"  
];

bot.on("ready", async() => {
    console.log('Ready');
});
bot.on("message", function(message){
    if (message.author.equals(bot.user))return;

    if (!message.content.startsWith(PREFIX)) return;


    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]){
        case "ping":
        message.channel.sendMessage("Pong!");
        break;
        
        case "hello":
        message.channel.sendMessage("Sup," + message.author.toString());
        break;

        case "info":
        message.channel.sendMessage("I'm the Android of the Supreme Leader @thresh");
        break;

        case "smk":
            if (args[0]) message.channel.sendMessage(smkreplies[Math.floor(Math.random() * smkreplies.length)]);
        break;

        case "ask":
        
             if (args[1]) message.channel.sendMessage(answers[Math.floor(Math.random(3342432341) * answers.length)]);
        else message.channel.sendMessage("Ask me a question...");
        break;

        case "embed":
        var embed = new Discord.RichEmbed()
            .setDescription("Testing Rich Embed");
        message.channel.sendEmbed(embed);
        break;

        case "play":
            if (!args[1]){
                message.channel.sendMessage("Please Provide a link");
                return;
            }
            if (!message.member.voiceChannel){
                message.channel.sendMessage("Please Join a voice Channel");
                return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
               queue: []
           };
            
            var server = servers[message.guild.id];
            server.queue.push(args[1]);

            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message);
        });
        break;

        case "help":
        var help = new Discord.RichEmbed()
        .setTitle("Commands for HP Bot")
        .addField("ping" , "Will return Pong if bot is online")
        .addField("smk", "Check if you're worth")
        .addField("info", "Information about me")
        .addField("ask", "Ask a question and it will return an answer")
        .addField("sbpump", "Bouss Liki ar pump")
        .setColor(0x00e6dc)
        message.channel.sendEmbed(help);
        break;

        case "skip":
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            break;

        case "stop":
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;

        case "sbpump":
        if (!message.member.voiceChannel){
            message.channel.sendMessage("Please Join a voice Channel");
            return;
        }
        var sbpump = new Discord.RichEmbed()
            .setTitle("Playing IsmailPump.mp3")
            .setColor(0x00e6dc)
            message.channel.sendEmbed(sbpump);
       
        const streamOptions = { seek: 0, volume: 1 };
        var voiceChannel = message.member.voiceChannel;
                voiceChannel.join().then(connection => {
                    console.log("joined channel");
                    const stream = YTDL('https://youtu.be/NO29iSHqwi0', { filter : 'audioonly' });
                    const dispatcher = connection.playStream(stream, streamOptions);
                    dispatcher.on("end", end => {
                        console.log("left channel");
                        voiceChannel.leave();
                    });
                }).catch(err => console.log(err));

        break;

        /*case "mute":
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have permission to mute" + toMute.username);
            if(message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES"));
            let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if(!toMute) return message.channel.sendMessage("You didn't specify a User Mention or ID!");

            let role = message.guild.roles.find(r => r.name === "User Muted");
            if(!role){
                try{
                    role = message.guild.createRole({
                        name: "User Muted",
                        color: "#00FFCD",
                        permissions: []
                    });
                    message.guild.channels.forEach(function(channel, id){
                       channel.overwritePermissions(role, {
                            SEND_MESSAGE: false,
                        });
                    });
                } catch(e) {
                    console.log(e.stack);
                }
            }
            
            if(toMute.roles.has(role.id)) return message.channel.sendMessage("This user is already Muted!");
            toMute.addRole(role);
            message.channel.sendMessage(toMute.user.username + " has been muted!");
            
        break;*/

        default: 
            message.channel.sendMessage("Invalid Command: Do '-hp help' for All commands.");

    }
});

bot.login(botsettings.TOKEN);