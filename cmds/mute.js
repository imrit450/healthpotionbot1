const Discord = module.require("discord.js");

module.exports.run = async (bot,message,args) => {
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
}

module.exports.help = {
    name: "mute"
}