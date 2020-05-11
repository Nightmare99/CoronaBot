const Discord = require('discord.js');
const _ = require('lodash');
const fetch = require('node-fetch');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.BOT_TOKEN);

client.on('message', message => {
    // message.react('ðŸ‘º');
    parts = message.content.split(' ');
    if (parts[0] == '/srinath') {
        if (parts[1].toUpperCase() == 'CORONA' || parts[1].toUpperCase() == 'COVID') {
            fetch('https://api.covid19india.org/data.json')
                .then((res) => res.json())
                .then((data) => {
                    var stateData = data.statewise;
                    var TNData = _.find(stateData, { statecode: "TN" });
                    var msg = "Today's COVID stats for TN: \n";
                    msg += "Active cases: " + TNData.active + "\n";
                    msg += "Total cases: " + TNData.confirmed + "\n";
                    msg += "New cases: " + TNData.deltaconfirmed + "\n";
                    msg += "Total deaths: " + TNData.deaths + "\n";
                    msg += "New deaths: " + TNData.deltadeaths + "\n"
                    message.channel.send(msg);
                });
        }
        else message.channel.send('Dei puriyara maadhri sollu da');
    }
});