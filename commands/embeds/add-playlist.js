const DefaultEmbed = require('./default-embed');


class AddPlaylistEmbed extends DefaultEmbed {
	constructor(playlist) {
		super(playlist);
		this.setTitle(':hourglass: Lista de reproducción agregada a la cola.');
		this.addField('Titulo', `\`${playlist.title}\``);
		this.addField('Autor', `\`${playlist.author}\``);
		this.addField('Link', playlist.url);
		this.setImage(playlist.thumbnailUrl);
	}
}

module.exports = AddPlaylistEmbed;