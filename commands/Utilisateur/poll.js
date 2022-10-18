const Command = require("../../modules/Command.js");
const color = require("../../modules/color.json");

class Poll extends Command {
    constructor(client) {
        super(client, {
            name: "poll",
            category: "Utilisateur",
            description: "Crée un sondage",
            usage: "poll"
        });
    }

    async run(message, args) {
        try {
            const embed = new Discord.MessageEmbed()
            .setTitle(args.join(" "))
            .setColor(color.bleu)
            const pollTitle = await message.channel.send(embed);
            await pollTitle.react("✅");
            await pollTitle.react("❌");

            const filter = reaction => reaction.emoji.name === "✅";
            const collector = pollTitle.createReactionCollector(filter, {
                time: 15000
            });
            collector.on("collect", r => console.log(`${r.emoji.name}`));
            collector.on("end", collected => console.log(`Le bot a collecté ${collected.size} ✅`));
            const filter1 = reaction => reaction.emoji.name === "❌";
            const collector1 = pollTitle.createReactionCollector(filter1, {
                time: 15000
            });
            collector1.on("collect", r => console.log(`${r.emoji.name}`));
            collector1.on("end", collected => console.log(`Le bot a collecté ${collected.size} ❌`));
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports= Poll;