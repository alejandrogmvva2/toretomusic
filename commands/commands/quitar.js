const RemoveSongEmbed = require('../embeds/remove-song');
const ErrorEmbed = require('../embeds/error');

//The Remove Command to throw away useless songs
const quitar = {
	name: 'quitar',
	description: 'Eliminar de la cola la primera canción',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('¡No hay canción que pueda eliminar!'));
		}

		const index = parseInt(arg, 10);
		if (!isNaN(index) && index >= 1 && serverQueue.songs.length > index) {
			message.channel.send(new RemoveSongEmbed(serverQueue.songs[index]));
			serverQueue.songs.splice(index, 1);
		} else {
			message.channel.send(new ErrorEmbed('¡El índice debe ser un número mayor que cero!'));
		}
	}
};


module.exports = quitar;