const Command = require("../../modules/Command.js");

class Playing extends Command {
    constructor(client) {
        super(client, {
            name: "playing",
            category: "Musique",
            description: "Affiche la musique qui est en train d'être jouée",
            usage: "playing"
        });
    }

    run(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue)
            return message.channel.send("Il n'y a aucune musique en cours !");
            return message.channel.send(`🎵 En ce moment: **${serverQueue.songs[0].title}**`);
    }
}

module.exports = Playing;