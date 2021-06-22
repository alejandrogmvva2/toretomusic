const DefaultEmbed = require('./default-embed');


class PlaySongEmbed extends DefaultEmbed {
	constructor(song) {
		super();

		this.setTitle(':notes: Ahora sonando');
		this.addField('Titulo', `\`${song.title}\``);
		this.addField('Canal De Youtube', `\`${song.author}\``);
		this.addField('Duración', `\`${song.duration}\``);
		this.addField('Link', song.url);
		this.setImage(song.thumbnailUrl);
	}
}

module.exports = PlaySongEmbed;