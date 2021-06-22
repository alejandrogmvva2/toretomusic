const Discord = require("discord.js");
const client = new Discord.Client();

client.on("message", (message) => {
  if (message.content.startsWith("t!ayuda")) {
    message.channel.send("```Lista de comandos:\nt!cancion - Muestra la canción que se esté reproduciendo.\nt!cola - Muestra la cola de canciones.\nt!parar - Utilizalo para parar la primera canción de la lista.\nt!play - Utilizalo para poner una canción.\nt!playlist - Utilizalo para poner una playlist de YouTube.\nt!quitar - Elimina una cancion de la cola.\nt!siguiente - Se pasa a la siguiente canción.\nt!invitar - Te mando el link para que me invites a tu server.```");
  }
});
client.login("NjE3MDA5MDAzNDk4ODMxOTAy.Xqieog.tskcI2xhyZNMzu3Iy5jsU8lGnzU");