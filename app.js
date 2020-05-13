const Discord = require('discord.js');
const _ = require('lodash');
const fetch = require('node-fetch');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
    parts = message.content.split(' ');
    if (message.author.bot) return;
    if (parts[0] == '/srinath') {
        if (parts[1].toUpperCase() == 'CORONA' || parts[1].toUpperCase() == 'COVID') {
            fetch('https://api.covid19india.org/data.json')
                .then((res) => res.json())
                .then((data) => {
                    var stateData = data.statewise;
                    var TNData = _.find(stateData, { statecode: "TN" });
                    const embed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Today's COVID stats for TN:")
                        .addFields(
                            { name: 'Active cases', value: TNData.active },
                            { name: 'Total cases', value: TNData.confirmed },
                            { name: 'New cases', value: TNData.deltaconfirmed, inline: true },
                            { name: 'Total deaths', value: TNData.deaths },
                            { name: 'New deaths', value: TNData.deltadeaths, inline: true },
                            { name: 'Last updated', value: TNData.lastupdatedtime },
                        )
                        .setFooter('Note: *API can be a little slow/weird, so be forgiving*');
                    message.channel.send(embed);
                });
        }
        else message.channel.send('Dei puriyara maadhri sollu da');
    }
});