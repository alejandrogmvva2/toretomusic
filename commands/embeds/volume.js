const DefaultEmbed = require('./default-embed');


class VolumeEmbed extends DefaultEmbed {
	constructor(previousVolume, newVolume) {
		super();
		this.setTitle(':speaker: Volumen');
		this.setDescription(`Cambiado de \`${previousVolume}\` a \`${newVolume}\``);
	}
}

module.exports = VolumeEmbed;