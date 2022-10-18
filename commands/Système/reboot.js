const Command = require("../../modules/Command.js");

class Reboot extends Command {
    constructor(client) {
        super(client, {
            name: "reboot",
            description: "Redémarrage du bot",
            usage: "reboot",
            guildOnly: true,
            category: "Système",
            permLevel: "Owner"
        });
    }

    async run(message) {
        try {
            await message.reply("Le bot se redémarre..");
            this.client.commands.forEach(async cmd =>{
                await this.client.unloadCommand(cmd);
            });
            process.exit(1);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Reboot;