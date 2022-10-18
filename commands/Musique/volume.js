const Command = require("../../modules/Command.js");

class Volume extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            category: "Musique",
            description: "Ajuster le volume de la musique",
            usage: "volume"
        });
    }

    run(message, args) {
        const { VoiceChannel } = message.member;
        if (!VoiceChannel) return message.channel.send("Vous devez être dans un salon vocal pour utiliser cette commande !");
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send("Il n'y a aucune musique à arrêter !");
        if (!args[0]) return message.channel.send(`Le volume actuel est: **${serverQueue.volume}**`);
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send(`J'ai mis le volume à: **${args[0]}`);
    }
}

module.exports = Volume;