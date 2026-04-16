require('dotenv').config();
const { REST, Routes, ApplicationCommandType } = require('discord.js');

const everywhere = {
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const commands = [
  {
    ...everywhere,
    name: 'ping',
    description: 'Replies with pong!',
  },
  {
    ...everywhere,
    name: '8ball',
    description: 'Answers your question.',
  },
  {
  ...everywhere,
  name: 'Get User Info',
  type: ApplicationCommandType.User,
  },
  {
  ...everywhere,
  name: 'Reverse Message',
  type: ApplicationCommandType.Message,
  }
];

const rest = new REST().setToken(process.env.TOKEN);

rest.put(
  Routes.applicationCommands(process.env.CLIENT_ID),
  { body: commands }
).then(() => {
  console.log('Commands registered!');
});