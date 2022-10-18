const Command = require("../../modules/Command.js");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            category: "Utilisateur",
            description: "Latence du bot + réponse API",
            usage: "ping",
            guildOnly: true
        });
    }

    async run(message) {
        try {
            const msg = await message.channel.send("Ping...");
            msg.edit(`Pong !\nLatence bot: ${msg.createdTimestamp - message.createdTimestamp}ms.\nAPi: ${Math.round(this.client.ping)}ms.`);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Ping;