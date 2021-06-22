const DefaultEmbed = require('./default-embed');


class ErrorEmbed extends DefaultEmbed {
	constructor(errMsg) {
		super();
		this.setColor('#FF0000');
		this.setTitle(':no_entry_sign: Error 404');
		this.setDescription(errMsg);
	}
}

module.exports = ErrorEmbed;