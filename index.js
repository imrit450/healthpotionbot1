const Discord = require("discord.js");
const YTDL = require("ytdl-core")


const TOKEN = "NDM4Mjk5MjQ1MTkyNDEzMjA1.DdCqPg.0Ps0EXAXrme0FkQwCHoJ4q96Ra4";
const PREFIX = "-hp ";
var bot = new Discord.Client();

function play(connection, message){
    var server = servers[message.guild.id];
    server.dispatcher = connection.playstream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function(){
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
}

var fortunes = [
    "Yes",
    "No",
    "Maybe",
    "How tf should i know?",
    "ummm what?",
];

bot.on("ready", function(){
    console.log("Ready");
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
        message.channel.sendMessage("Ti cok flmm, ki pu souC ladan lmao");
        break;
        case "ask":
             if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
        else message.channel.sendMessage("Can't Read that...");
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
        .addField("8ball", "Ask a question and it will return an anwser")
        .addField("sbpump", "Bouss Liki ar pump")
        .setColor(0x00e6dc)
        message.channel.sendEmbed(help)
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
            .setTitle("Playing IsmailPump.mp3");
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
        default: 
            message.channel.sendMessage("Invalid Command: Do '-hp help' for All commands.");

    }
});

bot.login(TOKEN);