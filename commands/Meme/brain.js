const Meme = require('../../modules/Meme.js');
const color = require('../../modules/color.json');

class Brain extends Meme {
    constructor(client) {
        super(client, {
            name: "brain",
            description: "Meme",
            usage: "brain <texte1; texte2; texte3; texte4>",
            category: "Meme"
        });
    }

    cmdVerify(message, args, loadingMessage) {
        const text = args.join(" ");
        if (!text.length) return Promise.reject(new this.client.methods.errors.UsageError("Vous devez entrer un texte !"), loadingMessage);
        return Promise.resolve(text);
    }

    async run(message, args, loadingMessage) {
        const text = await this.cmdVerify(message, args, loadingMessage);
        const meme = await this.fourMeme(93895088, text);
        await message.channel.send({
            embed: {
                title: "Si l'image ne se charge pas, cliquez ici.",
                url: meme,
                color: color.rouge,
                image: {
                    url: meme
                },
                footer: {
                    icon_url: message.author.avatarURL,
                    text: `${message.author.tag}`
                }
            }
        });
    }
}

module.exports = Brain;