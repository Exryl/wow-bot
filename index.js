require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
] });

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.content === '!ping') {
        message.channel.send('pong')
    }
});

client.on('messageCreate', (message) => {
    if (message.content === '!hello') {
        message.reply(`Hello <@${message.author.id}>!`)
    }
})

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!repeat ')) {
        const text = message.content.slice(8)
        message.channel.send(text)
    }
})

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!pick ')) {
        const text = message.content.slice(6).split(' ')
        const rand = Math.floor(Math.random() * text.length + 1)
        message.channel.send(text[rand - 1])
    }
})

const eightBallAnswers = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes — definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!8ball ')) {
        const rand = Math.floor(Math.random() * 20)
        message.channel.send(eightBallAnswers[rand])
    }
})

client.login(process.env.TOKEN);