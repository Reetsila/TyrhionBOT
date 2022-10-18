/* eslint-disable */
const color = require('../modules/color.json');
module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;
        if (!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return;
        const settings = this.client.getSettings(message.guild);
        message.settings = settings;
        if (message.content.indexOf(settings.prefix) !== 0) return;
        const args = message.content.slice(settings.prefix.length).trim().split(/ + /g);
        const command = args.shift().toLowerCase();
        if (message.guild && !message.member) await message.guild.fetchMember(message.author);
        const level = this.client.permLevel(message);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;

        if (level < this.client.levelCache[cmd.conf.permLevel]) {
            if (settings.systemNotice === "true") {
                let embed = new Discord.MessageEmbed();
                embed.setColor(color.rouge);
                embed.SetDescription(`Erreur !\n**Vous ne possédez pas le niveau de permission requis**.`);
                embed.addField("Niveau de permission actuel:", `${this.client.config.permLevels.find(l => l.level === level).name}`);
                embed.addField("Niveau de permission requis:", `${this.client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
                embed.setFooter(`${message.author.tag} | ${cmd.help.name}`, message.author.avatarURL);
                return message.channel.send({embed});
            } else {
                return;
            }
        }

        message.author.permLevel = level;

        message.flags = [];
        while (args[0] && args[0][0] === "-") {
            message.flags.push(args.shift().slice(1));
        }

        this.client.logger.log(`${message.author.username} (${message.author.id} - ${this.client.config.permLevels.find(l => l.level === level).name}) lance la commande ${cmd.help.name}`);
        cmd.run(message, args, level);
    }
};