// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildVoiceStates
] });

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) {
	  return;
	}
	const { commandName } = interaction;
	if (commands[commandName as keyof typeof commands]) {

		try{
			commands[commandName as keyof typeof commands].execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	} else {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
  });

// Log in to Discord with your client's token
client.login(config.DISCORD_TOKEN);
