const Command = require("../../modules/Command.js");

class Resume extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            category: "Musique",
            description: "Remet en marche la musique en pause",
            usage: "resume"
        });
    }

    run(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send("⏯ Je remets en marche la musique !");
        }
        return message.channel.send("Il n'y a aucune musique qui est en train de jouer !");
    }
}

module.exports = Resume;