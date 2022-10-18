const Command = require("../../modules/Command.js");

class Skip extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            category: "Musique",
            description: "Sauter la musique qui est en train d'être jouée.",
            usage: "skip"
        });
    }

    run(message) {
        const { VoiceChannel } = message.member;
        if (!VoiceChannel) return message.channel.send("Vous devez être dans un salon vocal pour utiliser cette commande !");
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Il n'y a aucune musique en cours !");
        serverQueue.connection.dispatcher.end("La commande skip est utilisée !");
    }
}

module.exports = Skip;