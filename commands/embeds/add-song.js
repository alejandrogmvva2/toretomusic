const PlaySongEmbed = require('./play-song');


class AddSongEmbed extends PlaySongEmbed {
	constructor(song) {
		super(song);
		this.setTitle(':hourglass: Canción añadida');
	}
}

module.exports = AddSongEmbed;