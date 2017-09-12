const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;
const token = config.token

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'roze vacht is uit de mode') {
    msg.channel.send('Je bent zelf uit de mode')
  }
  if (msg.content.toLowerCase() === prefix + 'blauwe vacht is uit de mode') {
    msg.channel.send('Daar heb je helemaal gelijk in')
  }
  if (msg.content.toLowerCase() === prefix + 'kut jismus') {
    msg.channel.send('I love you too :heart:')
  }
  if (msg.content.toLowerCase() === prefix + 'oui') {
    msg.channel.send('<:oui_oui_croissant:348743825260412938>')
  }
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.channel.send('en pong spelen ping pong, ping zei de pingpong bal, ping die zei dat pong het deed, maar pong zei nee het was ...')
  }
  if (msg.content.toLowerCase() === prefix + 'pong!') {
    msg.channel.send('Thanks')
  }
  if (msg.content.toLowerCase() === prefix + '/jismusheeftechtzoveelswag') {
    msg.channel.send(':sunglasses:')
  }
  if (msg.content.toLowerCase() === prefix + 'beep beep') {
    msg.channel.send('ima sheep')
  }
  if (msg.content.toLowerCase() === prefix + 'hoe doe je tekst in zon zwart vakje?') {
    msg.channel.send('omring je text met dat vage ding naast de 1 knop')
  }
  if (msg.content.toLowerCase().startsWith(prefix + 'echo')) {
    let args = msg.content.toLowerCase().split(" ").slice(1);
    let thingToEcho = args.join(" ")
    msg.channel.sendMessage(thingToEcho)
  }
  if (msg.content.toLowerCase() === prefix + "woordenboek") {
    msg.channel.send("Educateren")
  }
  if (msg.content.toLowerCase() === prefix + 'commands') {
    msg.channel.send('`roze vacht is uit de mode` `blauwe vacht is uit de mode` `kut jismus` `oui` `ping` `pong!` `/jismusheeftechtzoveelswag` `beep beep` `comands`')
  }
});

client.login(token);
