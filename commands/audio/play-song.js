const ytdl = require('ytdl-core');
const PlaySongEmbed = require('../embeds/play-song');

//Play song until user is inside voice channel
const playSong = (message, serverQueue, queue) => {
	const song = serverQueue.songs[0];

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(message.guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
		filter: 'audioonly',
		quality: 'highestaudio',
		highWaterMark: 1 << 25
	}))
		.on('start', () => {
			console.log('Music started!');
			message.channel.send(new PlaySongEmbed(song));
		})
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			playSong(message, serverQueue, queue);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume);
};

module.exports = playSong;