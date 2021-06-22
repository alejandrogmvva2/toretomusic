const PlaySongEmbed = require('./play-song');


class CurrentSongEmbed extends PlaySongEmbed {
	constructor(song) {
		super(song);
		this.setTitle(':notes: Actualmente sonando =>');
	}
}

module.exports = CurrentSongEmbed;