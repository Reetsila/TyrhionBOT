const Command = require("../../modules/Command.js");

class Pause extends Command {
    constructor(client) {
        super(client, {
            name: "pause",
            category: "Musique",
            description: "Mettre en pause la musique",
            usage: "pause"
        });
    }

    run(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send("⏸ La musique est en pause");
        }
        return message.channel.send("Il n'y a aucune musique qui est en train de jouer !");
    }
}

module.exports = Pause;