class Command {
    constructor(
        client,
        {
            name = null,
            description = "Aucune description détectée",
            category = "Utilisateur",
            usage = "Aucune utilisation détectée",
            enable = true,
            guildOnly = false,
            aliases = new Array(),
            permLevel = "Utilisateur"
        }
    ) {
        this.client = client;
        this.conf = { enable, guildOnly, aliases, permLevel };
        this.help = { name, description, category, usage };
    }
}

module.exports = Command;