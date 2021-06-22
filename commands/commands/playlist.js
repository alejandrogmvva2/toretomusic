const ytpl = require('ytpl');

const AddPlaylistEmbed = require('../embeds/add-playlist');
const ErrorEmbed = require('../embeds/error');

const playSong = require('../audio/play-song');

//Play with Queue Command
const playlist = {
	name: 'playlist',
	description: 'Agregar una lista de reproducción a la cola',
	async execute(message, arg, musicBot) {
		const {voiceChannel} = message.member;
		if (!voiceChannel) {
			return message.channel.send(new ErrorEmbed('¡Necesitas estar en un canal de voz para reproducir música!'));
		}

		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send(new ErrorEmbed('¡Necesito los permisos para unirme y hablar en tu canal de voz!'));
		}

		let playlistInfo = null;

		if (ytpl.validateURL(arg)) {
			playlistInfo = await ytpl(arg);
		} else {
			return message.channel.send(new ErrorEmbed('¡Esta canción está restringida en tu región o no se pudo encontrar!'));
		}

		const playlist = {
			title: playlistInfo.title,
			url: playlistInfo.url,
			author: playlistInfo.author.name,
			thumbnailUrl: playlistInfo.items[0].thumbnail
		};

		const songs = playlistInfo.items.map(video => {
			return {
				title: video.title,
				url: video.url,
				author: video.author.name,
				thumbnailUrl: video.thumbnail,
				duration: video.duration
			};
		});

		const serverQueue = musicBot.queue.get(message.guild.id);

		if (serverQueue === undefined) {
			const newQueue = {
				voiceChannel,
				connection: null,
				songs: [],
				volume: 0.15
			};

			songs.forEach(song => newQueue.songs.push(song));
			musicBot.queue.set(message.guild.id, newQueue);

			message.channel.send(new AddPlaylistEmbed(playlist));

			try {
				newQueue.connection = await voiceChannel.join();
				playSong(message, newQueue, musicBot.queue);
			} catch (error) {
				console.log(error);
				musicBot.queue.delete(message.guild.id);
				message.channel.send(new ErrorEmbed('Error 404'));
			}
		} else {
			songs.forEach(song => serverQueue.songs.push(song));
			message.channel.send(new AddPlaylistEmbed(playlist));
		}
	}
};


module.exports = playlist;