const Discord = require("discord.js");
const client = new Discord.Client();

client.on("message", (message) => {
  if (message.content.startsWith("t!invitar")) {
    message.channel.send("`Este comando está actualmente en mantenimiento. Disculpa las molestias.`");
  }
});
client.login("NjE3MDA5MDAzNDk4ODMxOTAy.Xqieog.tskcI2xhyZNMzu3Iy5jsU8lGnzU");