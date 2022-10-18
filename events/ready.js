module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        await this.client.wait(1000);

        this.client.appInfo = await this.client.fetchApplication();
        setInterval(async () => {
            this.client.appInfo = await this.client.fetchApplication();
        }, 60000);
        this.client.user.setActivity("under development");
        const channel = this.client.channels.cache.get("701010883312222208");
        channel.send(":gear: Le bot est redémarré !");
        this.client.logger.log(`Tyrhion est en ligne. ${this.client.users.size} utilisateurs ur ${this.client.guilds.size} serveurs`, "ready");
    } 
};