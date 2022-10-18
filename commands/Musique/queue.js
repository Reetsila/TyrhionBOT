const Command = require("../../modules/Command.js");

class Queue extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            category: "Musique",
            description: "Affiche la liste de musique",
            usage: "queue"
        });
    }

    run(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue)
            return message.channel.send("Il n'y a aucune musique en cours !");
            return message.channel.send(`
                **Playlist:**
                ${serverQueue.songs.map(song => `${song.title}`).join("\n")}
                ___________
                **Musique actuelle:** ${serverQueue.songs[0].title}
            `);
    }
}

module.exports = Queue;