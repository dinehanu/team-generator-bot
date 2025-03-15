import { BaseChannel, bold, Channel, CommandInteraction, GuildMember, SlashCommandBuilder, TextChannel, VoiceChannel } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("random")
  .setDescription("Creates a random team with online users in channel");

export async function execute(interaction: CommandInteraction) {
  const member = interaction.member as GuildMember; 
  if(member) {
    const voiceChannelId = member.voice.channelId
    if(voiceChannelId){
      const voiceChannel = await interaction.client.channels.fetch(voiceChannelId)
      const members = await getCurrentChannelMembers(voiceChannel)

      if(!members || members.length === 0){
        return interaction.reply("No one here?");
      }
    
      if(members.length > 8){
        return interaction.reply("To many players!");
      }
    
      const memberNames = members.map(member => member.displayName)
    
      if(memberNames.length <= 4) {
        return interaction.reply("DreamTeam: " + memberNames.join(", "));
      }
    
      return interaction.reply(getRandomizedTeames(memberNames));
    }
    else {
      return interaction.reply("Join the voicechannel that you want to create a team in");
    }
  }
}

async function getCurrentChannelMembers (channel: Channel | null) {
  if(channel && channel.type === 2 && channel.members) {
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