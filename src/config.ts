import tokens from "./config.json"

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, GUILD_ID } = tokens;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !GUILD_ID) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  GUILD_ID,
};