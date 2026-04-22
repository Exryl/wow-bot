require('dotenv').config();
const { Client, GatewayIntentBits, MessageFlags } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const badWords = [
    'nigger', 'niggers', 'nigga', 'niggas',
    'faggot', 'faggots', 'fag', 'fags',
    'kike', 'kikes',
    'chink', 'chinks',
    'spic', 'spics',
    'wetback', 'wetbacks',
    'tranny', 'trannies',
    'retard', 'retards',
    'cunt', 'cunts',
    'dyke', 'dykes',
    'cracker', 'crackers',
    'raghead', 'ragheads',
    'towelhead', 'towelheads',
    'gook', 'gooks',
    'beaner', 'beaners',
    'zipperhead',
];

const containsBadWords = (text) => {
    const lower = text.toLowerCase();
    return badWords.some(word => lower.includes(word));
};

const eightBallAnswers = [
    "It is certain.", "It is decidedly so.", "Without a doubt.",
    "Yes — definitely.", "You may rely on it.", "As I see it, yes.",
    "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.",
    "Reply hazy, try again.", "Ask again later.", "Better not tell you now.",
    "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.",
    "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful.",
];

client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!ping') {
        message.channel.send('pong');
    }
    if (message.content === '!hello') {
        message.reply(`Hello <@${message.author.id}>!`);
    }
    if (message.content.startsWith('!repeat ')) {
        const text = message.content.slice(8);
        message.channel.send(text);
    }
    if (message.content.startsWith('!pick ')) {
        const options = message.content.slice(6).split(' ');
        const rand = Math.floor(Math.random() * options.length);
        message.channel.send(options[rand]);
    }
    if (message.content.startsWith('!8ball ')) {
        const rand = Math.floor(Math.random() * eightBallAnswers.length);
        message.channel.send(eightBallAnswers[rand]);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        }
        if (interaction.commandName === '8ball') {
            const rand = Math.floor(Math.random() * eightBallAnswers.length);
            await interaction.reply(eightBallAnswers[rand]);
        }
        if (interaction.commandName === 'hello') {
            await interaction.reply(`Hello ${target.tag}.`);
        }
    }

    if (interaction.isUserContextMenuCommand()) {
        if (interaction.commandName === 'Get User Info') {
            const target = interaction.targetUser;
            await interaction.reply(`You right clicked ${target.tag}!`);
        }
    }

    if (interaction.commandName === 'Reverse Message') {
        const target = interaction.targetMessage;

        if (!target.content) {
            await interaction.reply({
                content: 'That message has no text to reverse!',
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        if (/\p{Emoji}/u.test(target.content)) {
            await interaction.reply({
                content: 'Messages with emojis can\'t be reversed!',
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        const reversed = target.content.split('').reverse().join('');

        if (containsBadWords(reversed)) {
            await interaction.reply({
                content: 'That message contains bad words!',
                flags: MessageFlags.Ephemeral,
            });
            return;
        }

        await interaction.reply(reversed);
    }
});

client.login(process.env.TOKEN);