require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
] });

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
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.TOKEN);