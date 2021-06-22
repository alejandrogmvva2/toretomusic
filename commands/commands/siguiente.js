const SkipSongEmbed = require('../embeds/skip-song');
const ErrorEmbed = require('../embeds/error');

//Skip Command
const siguiente = {
	name: 'siguiente',
	description: 'Salta la canción sonando actualmente',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		if (!message.member.voiceChannel) {
			return message.channel.send(new ErrorEmbed('¡Necesitas estar en un canal de voz para saltarte la música!'));
		}

		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('¡No hay canción que pueda saltar!'));
		}

		message.channel.send(new SkipSongEmbed(serverQueue.songs[0]));
		serverQueue.connection.dispatcher.end();
	}
};


module.exports = siguiente;