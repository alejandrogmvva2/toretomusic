const DefaultEmbed = require('./default-embed');


class StopQueueEmbed extends DefaultEmbed {
	constructor() {
		super();
		this.setTitle('¡Cola borrada con éxito!');
	}
}

module.exports = StopQueueEmbed;