const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "/"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === prefix + '/hello') {
    if (msg.author.bot) return;
    msg.channel.sendMessage('Hello World');
  }
});

client.login('MzA5NjkyNzM1MjMxNjIzMTcy.DHyiyQ.DO7d-uu6P5iGsBzPoTac55Gtkls');