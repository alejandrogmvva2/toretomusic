const Discord = require('discord.js');

class DefaultEmbed extends Discord.RichEmbed {
	constructor() {
		super({
			timestamp: Date.now()
		});
	}
}

module.exports = DefaultEmbed;