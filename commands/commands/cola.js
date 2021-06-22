const ListQueueEmbed = require('../embeds/list-queue');

//Queue Command
const cola = {
	name: 'cola',
	description: 'Muestra la cola de canciones de bot.',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		message.channel.send(new ListQueueEmbed(serverQueue));
	}
};


module.exports = cola;