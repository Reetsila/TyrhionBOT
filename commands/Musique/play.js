const Command = require("../../modules/Command.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const { Util } = require("discord.js");

class Play extends Command {
    constructor(client) {
        super(client, {
            name: "play",
            category: "Musique",
            description: "Jouer et ajouter de la musique",
            usage: "play"
        });
    }

    async run(message, args) {
        const { VoiceChannel } = message.member;
        if (!VoiceChannel) return message.channel.send("Vous devez être dans un vocal salon pour utiliser cette commande !");
        const serverQueue = message.client.queue.get(message.guild.id);
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            id: songInfo.video_id,
            title: Util.escapeMarkdown(songInfo.title),
            url: songInfo.video_url
        };
        if (serverQueue) {
            serverQueue.queue.push(song);
            return message.channel.send(`✅ **${song.title}** est ajoutée à la queue !`);
        }
        const queueConstruct = {
            textChannel: message.channel,
            VoiceChannel,
            connection: null,
            songs: [],
            volume: 1,
            playing: true
        };
        message.client.queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        const play = async song => {
            const queue = message.client.queue.get(message.guild.id);
            if (!song) {
                queue.VoiceChannel.leave();
                message.client.queue.delete(message.guild.id);
                return;
            }
            const dispatcher = queue.connection
            .playOpusStream(await ytdlDiscord(song.url), { passes: 3 })
            .on("end", reason => {
                if (reason === "Récupération trop lente !") {
                    console.log("La musique s'est arrêtée !");
                } else {
                    console.log(reason);
                }
                queue.songs.shift();
                play(queue.songs[0]);
            })
            .on("error", error => console.error(error));
            dispatcher.setVolumeLogarithmic(queue.volume / 5);
            queue.textChannel.send(`🎶 Commence à jouer: **${song.title}**`);
        };

        try {
            const connection = await VoiceChannel.join();
            queueConstruct.connection = connection;
            play(queueConstruct.songs[0]);
        } catch (error) {
            console.log(`Je n'ai pas pu rejoindre le salon: ${error}`);
            message.client.queue.delete(message.guild.id);
            await VoiceChannel.leave();
        }
    }
}

module.exports = Play;