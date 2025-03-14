import { BaseChannel, bold, CommandInteraction, GuildMember, SlashCommandBuilder, TextChannel, VoiceChannel } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("random")
  .setDescription("Creates a random team with online users in channel");

export async function execute(interaction: CommandInteraction) {


  const member = interaction.member;
  if(member instanceof GuildMember) {
    console.log("Member is GuildMember!")
  }
  console.log("User that trigggered the slash command: " + interaction.client.user.displayName)

  console.log("interactionuser: " + interaction.member?.user.username)

  const channel = await interaction?.channel?.fetch()
  channel?.type
  const members = await getCurrentChannelMembers(channel)

  if(!members){
    return interaction.reply("No one here?");
  }

  if(members.length > 8){
    return interaction.reply("To many players!");
  }

  const memberNames = members.map(member => member.displayName)

  if(memberNames.length <= 4) {
    return interaction.reply(memberNames.join(", "));
  }

  return interaction.reply(getRandomizedTeames(memberNames));
}

async function getCurrentChannelMembers (channel?: any) {

  console.log("Kanalen är av typ: " + channel?.type)
  if(channel instanceof TextChannel) {
    const members = Array.from(channel.members.values())
    return members
  }
}

const shuffle = (members: string[]): string[] => {
  let currentIndex = members.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [members[currentIndex], members[randomIndex]] = [
      members[randomIndex], members[currentIndex]];
  }

  return members;
};

const getRandomizedTeames = (memberNames: string[]) => {
  const randomizedMembers = shuffle(memberNames)

  const half = Math.ceil(randomizedMembers.length / 2);    

  const firstHalf = randomizedMembers.slice(0, half)
  const secondHalf = randomizedMembers.slice(half)

  const response = 
      bold("Team 1") + "\n" + firstHalf.join("\n") 
      + "\n\n" 
      + bold("Team 1") + "\n" + secondHalf.join("\n") 

  return response
}