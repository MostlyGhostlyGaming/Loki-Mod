const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");
const PREFIX = '.';

bot.on('ready', () =>{
    console.log('Loki Mod Online');
    bot.user.setActivity('Loki Support | .help');
})

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.reply('pong!`');
            break;

    }



    switch (args[0]) {
        case 'kick':
            if(!args[1]) message.channel.send('you need to specify a person!')

            const user = message.mentions.users.first();

            if(user){
                const member =  message.guild.member(user);
                if(member){
                    member.kick({ression: 'You Have Been Kicked'}).then(() =>{
                        message.reply(`Sucessfully kicked ${user.tag}`);
                    }).catch(err =>{
                        message.reply('I was unable to kick the member');
                        console.log(err);
                    });
                } else{
                    message.reply("That user isn\'t in the thid guild")
                } 
            } else {
                message.reply('that user isn\'t in the guild')
            }
            
        break;
    }

    switch (args[0]) {
        case 'ban':
            if(!args[1]) message.channel.send('you need to specify a person!')

            const user = message.mentions.users.first();

            if(user){
                const member =  message.guild.member(user);
                if(member){
                   member.ban;({ression: 'You Were Banned'}).then(() =>{
                       message.reply(`Sucsessfuly Banned ${user.tag}`)
                   })
                } else{
                    message.reply("That user isn\'t in the thid guild")
                } 
            } else {
                message.reply('that user isn\'t in the guild')
            }
            
        break;
    }

})

bot.on('message', message=>{

    let args = message.content.slice(PREFIX.length).split(' ');

    switch(args[0]){
        case 'invite':
            const embed = new Discord.MessageEmbed()
            .setTitle('Loki Mod Invite Information')
            .setDescription('Hi, Im Loki Mod! I was made as a moderation bot for people to use! you can find information for the bot with the .help command. thank you for chating with me!')
            .addField('Invite To You Server', 'So do you want a moderation bot? if so, Your in luck! here is the invite to add it to your server: https://discord.com/api/oauth2/authorize?client_id=759048144108388442&permissions=8&scope=bot. Enjoy! :)')
            .addField('Invite To The Help Server', 'are you having trouble with the Loki Mod Bot? If so please join the Loki support server here: https://discord.gg/BMyTUmp. A admin or developer will be happy to help you! :)')
            .setColor('#00FFF2')
            
            message.channel.send(embed);
        break;


    }
})

bot.on('message', message=>{

    const user = message.mentions.users.first();

    let args = message.content.slice(PREFIX.length).split(' ');

    switch(args[0]){
        case 'warn':
            const embed = new Discord.MessageEmbed()
            .setTitle('You Have Been Warned')
            .setDescription('You Have Been Warned In The Loki Support Server. This Is The List Of Levels')
            .addField('Demote', '2 Warns And You Get Demoted')
            .addField('Mute', '3 Warns And You Get A Mute')
            .addField('Kick', '4 Warns And You Get A Kick From The Server')
            .addField('Ban', '5 Warns And You Get A Ban')
            .setColor('#00FFF2')
            
            message.mentions.members.first().send(embed);
        break;


    }
})

bot.on('message', message=>{

    let args = message.content.slice(PREFIX.length).split(' ');

    switch(args[0]){
        case 'help':
            const embed = new Discord.MessageEmbed()
            .setTitle('Loki Mod Help')
            .setDescription('Hi, Im Loki Mod! I was made as a moderation bot for people to use! you can find information for the bot with the .help command. thank you for chating with me!')
            .addField('General Information', 'Thank you for inviting Loki Mod! We hope you Enjoy The newest Moderation Bot! More Features to the bot will be added! here are some commands!: `.kick`,`.ban`,`.mute`,`.warn`,`.help`,`.invite`, `.poll` Hope you enjoy!')
            .addField('Other Information', 'When The Loki Mod Bot Is Offline, It Is Most Likely Being Worked On. So Just Expect The Loki Mod Bot To Be Worked On Because Me And The Owner Both Have Big Ideas For This Bot. Stay Safe Out There And Enjoy The Loki Mod Bot!')
            .setColor('#00FFF2')        
            message.channel.send(embed);
        break;


    }
})

bot.on('message', message =>{
    let args = message.content.slice(PREFIX.length).split(' ');

    switch(args[0]){
        case "poll":
            const embed = new Discord.MessageEmbed()
            .setColor(0xFFC300)
            .setTitle("Inititate Poll")
            .setDescription("p?poll to inititate a simple yes or no poll")
            
            if(!args[1]){
                message.channel.send(embed);
            }

            let msgArgs = args.slice(1).join(" ");

            message.channel.send("`" + msgArgs + "`").then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
            });

        break;
    }
});

bot.on('message', message => {
    let args = message.content.slice(PREFIX.length).split(' ');
 
    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!person) return  message.reply("I CANT FIND THE USER ")
 
            let mainrole = message.guild.roles.cache.find(role => role.name === "Member");
            let role = message.guild.roles.cache.find(role => role.name === "Muted");
           
 
            if(!role) return message.reply("Couldn't find the mute role.")
 
 
            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }
 
            person.roles.remove(mainrole.id)
            person.roles.add(role.id);
 
 
            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
 
            setTimeout(function(){
                
                person.roles.add(mainrole.id)
                person.roles.remove(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));
 
 
    
        break;
    }
 
 
});

bot.login(process.env.BOT_TOKEN);
