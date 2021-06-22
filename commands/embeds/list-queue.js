const DefaultEmbed = require('./default-embed');


class ListQueueEmbed extends DefaultEmbed {
	constructor(serverQueue) {
		super();
		if (serverQueue === undefined) {
			this.setTitle('¡La cola está actualmente vacía!');
		} else {
			for (let i = 1; i < serverQueue.songs.length && i < 26; i++) {
				this.addField(`#${i}`, `\`${serverQueue.songs[i].title}\``);
			}
		}
	}
}

module.exports = ListQueueEmbed;