const VolumeEmbed = require('../embeds/volume');
const ErrorEmbed = require('../embeds/error');

//Volume Command 
const volumen = {
	name: 'volumen',
	description: 'Cambiar el volumen de la canción',
	execute(message, arg, musicBot) {
		const serverQueue = musicBot.queue.get(message.guild.id);

		if (!serverQueue) {
			return message.channel.send(new ErrorEmbed('No hay ninguna canción actualmente reproduciendose, por lo que no pude cambiar el volumen'));
		}

		const nbr = parseInt(arg, 10);
		if (!isNaN(nbr) && (nbr >= 0 && nbr <= 100)) { //Checking whether a number or not
			message.channel.send(new VolumeEmbed(serverQueue.volume * 100, nbr));
			serverQueue.volume = nbr / 100;

			const {dispatcher} = serverQueue.connection;
			if (dispatcher) {
				dispatcher.setVolumeLogarithmic(serverQueue.volume);
			}
		} else {
			message.channel.send(new ErrorEmbed('¡El volumen debe ser un número entre 0 y 100!'));
		}
	}
};


module.exports = volumen;