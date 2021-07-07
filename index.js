const discord = require('discord.js');
const fs = require('fs');
require('dotenv/config')

const client = new discord.Client();

client.on('ready', () => {
    console.log('Ready');
    client.user.setActivity('Guys No memes in #general');
});

client.login(process.env.TOKEN);

client.on('guildMemberRemove', member => {
    deadMembers = JSON.parse(fs.readFileSync('people.json'));
    delete deadMembers[member.id];
    deadMembers[member.id] = {
        'nick': member.displayName,
        'roles': Array.from(member.roles.cache.keys())
    }
    fs.writeFileSync('people.json', JSON.stringify(deadMembers))
});


client.on('guildMemberAdd', member => {
    deadMembers = JSON.parse(fs.readFileSync('people.json'));
    if (deadMembers[member.id]) {
        if (member.displayName != deadMembers[member.id]['nick']) {
            member.setNickname(deadMembers[member.id]['nick']);
        }
        member.roles.set(deadMembers[member.id]['roles']);
        delete deadMembers[member.id];
        fs.writeFileSync('people.json', JSON.stringify(deadMembers))
    }
});