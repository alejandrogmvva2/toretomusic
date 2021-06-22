const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

//Uptime Robot 24/7 Host
//*************************************************************
const http = require('http');
const express = require('express');
const app = express();

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

app.get('/', (request, response) => {
return response.send("OK")
});
//*************************************************************

class MusicBot {
	/**
	 * Place Discord Token And Google API Key in musicbot.js {Mandatory}
	 */
	constructor(options) {
		if (!options || !options.discordToken || !options.googleKey) {
			throw new Error('Either Token or Google Key is Missing');
		}

		this.discordToken = options.discordToken;
		this.googleKey = options.googleKey;
		this.prefix = options.prefix || 't!'; //Prefix setup

		this.queue = new Map();

		this.setup_();
	}
  
  start() {
		this.client.login(this.discordToken);
	}
  
  setup_() {
		this.client = new Discord.Client();
		this.client.commands = new Discord.Collection();  ///Command Handler

		const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			this.client.commands.set(command.name, command);
		}

		this.client.once('ready', () => {  ///Status
			console.log('Bot is ready!');
			this.client.user.setActivity('Musica 🎶 | t!ayuda', { type: 'Listening' });
		});

		this.client.on('message', message => {   //Main Argument Call
			if (message.author.bot || !message.content.startsWith(this.prefix)) {
				return;
			}

			const args = message.content.slice(this.prefix.length).split(/ +/); //Slicing Prefix
			const command = args.shift().toLowerCase();

			const arg = args.join(' ');

			if (!this.client.commands.has(command)) {
				return;
			}

			try {
				this.client.commands.get(command).execute(message, arg, this);  //Help available for the commands goes here 
			} catch (error) {
				console.error(error);
			}
		});
	}
}

module.exports = MusicBot;