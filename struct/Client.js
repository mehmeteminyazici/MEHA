const { Client, Collection, Intents } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			disableMentions: 'everyone',
      
			intents:Intents.ALL,
		});

		this.commands = new Collection();

		this.cooldowns = new Collection();

		this.config = config;
	}
};
