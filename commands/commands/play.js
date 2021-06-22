const ytdl = require('ytdl-core');
const {YouTube} = require('better-youtube-api');

const AddSongEmbed = require('../embeds/add-song');
const ErrorEmbed = require('../embeds/error');

const playSong = require('../audio/play-song');

//The most awaited Play Command
const play = {
	name: 'play',
	description: 'Agregar una canción a la cola',
	async execute(message, arg, musicBot) {
		const {voiceChannel} = message.member;
		if (!voiceChannel) {
			return message.channel.send(
				new ErrorEmbed('¡Necesitas estar en un canal de voz para reproducir música!')
			);
		}

		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send(
				new ErrorEmbed('¡Necesito los permisos para unirme y hablar en tu canal de voz!')
			);
		}

		const youtube = new YouTube(musicBot.googleKey);

		let songInfo = null;

		if (ytdl.validateURL(arg)) {
			songInfo = await ytdl.getInfo(arg);
		} else {
			const infos = await youtube.searchVideos(arg, 1);
			if (infos.results.length === 0) {
				return message.channel.send(
					new ErrorEmbed('¡No se pudo encontrar esta canción!')
				);
			}

			songInfo = await ytdl.getInfo(infos.results[0].url);
		}

		if (!songInfo) {
			return message.channel.send(
				new ErrorEmbed('¡Esta canción está restringida según su región o no se pudo encontrar!')
			);
		}

		const song = {
			title: songInfo.title,
			url: songInfo.video_url,
			author: songInfo.author.name,
			thumbnailUrl: songInfo.player_response.videoDetails.thumbnail.thumbnails.pop().url,
			duration: new Date(songInfo.length_seconds * 1000).toISOString().slice(11, 19)
		};

		const serverQueue = musicBot.queue.get(message.guild.id);

		if (serverQueue === undefined) {
			const newQueue = {
				voiceChannel,
				connection: null,
				songs: [],
				volume: 0.15
			};

			newQueue.songs.push(song);
			musicBot.queue.set(message.guild.id, newQueue);

			message.channel.send(new AddSongEmbed(song));

			try {
				newQueue.connection = await voiceChannel.join();
				playSong(message, newQueue, musicBot.queue);
			} catch (error) {
				console.log(error);
				musicBot.queue.delete(message.guild.id);
				message.channel.send(new ErrorEmbed('Error 404'));
			}
		} else {
			serverQueue.songs.push(song);
			message.channel.send(new AddSongEmbed(song));
		}
	}
};


module.exports = play;