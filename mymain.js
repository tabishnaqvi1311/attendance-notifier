const crawlPage = require('./mycrawl');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
    // Add more intents as needed for your bot's functionality
});

const token = process.env.TOKEN;
client.login(token);

const sendNotification = async () => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;
        console.log('getIt ran');
        const attendance = await crawlPage();
        console.log(`your attendance is ${attendance}, sending to discord...`)
        attendance < 75 ?
            message.reply({ content: `WAKE UP 😱! Attendance is <75   :: (${attendance}) ` })
            :
            message.reply({ content: `you can sleeep!, attendance is ${attendance} 😴` });
    })
}

client.once('ready', async () => {
    console.log('Bot is ready!');
    await sendNotification();
})
