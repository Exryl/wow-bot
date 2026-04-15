require('dotenv').config();
const { REST, Routes } = require('discord.js');

const everywhere = {
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const commands = [
  {
    ...everywhere,
    name: 'ping',
    description: 'Replies with pong!',
  }
];

const rest = new REST().setToken(process.env.TOKEN);

rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID,  process.env.GUILD_ID),
  { body: commands }
).then(() => {
  console.log('Commands registered!');
});