const StopQueueEmbed = require('../embeds/stop-queue');
const ErrorEmbed = require('../embeds/error');

//Stop Command
const parar = {
	name: 'parar',
	description: 'Detiene la canción actual que se está reproduciendo en la cola.',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('No hay ninguna canción actualmente sonando o en cola'));
		}

		if (!message.member.voiceChannel) {
			return message.channel.send(new ErrorEmbed('¡Necesitas estar en un canal de voz para detener la música!'));
		}

		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		message.channel.send(new StopQueueEmbed());
	}
};


module.exports = parar;