const CurrentSongEmbed = require('../embeds/current-song');
const ErrorEmbed = require('../embeds/error');


//Current Song Command
const cancion = {
	name: 'cancion',
	description: 'Mostrar la canción que se está reproduciendo',
	async execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('¡Actualmente no hay una canción sonando!'));
		}

		message.channel.send(new CurrentSongEmbed(serverQueue.songs[0]));
	}
};

module.exports = cancion;