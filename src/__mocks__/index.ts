import { GuildMember, Role, TextChannel, CommandInteraction, FetchChannelOptions, Collection, Guild } from "discord.js";

// Guild Member Mock
export const getGuildMemberMock = () =>
  ({
    roles: {
      add: jest.fn(),
      cache: {
        get: jest.fn(),
      },
    },
    guild: {
      roles: {
        cache: {
          get: jest.fn(),
        },
      },
      channels: {
        cache: {
          get: jest.fn(),
        },
      },
    },
  } as unknown) as GuildMember;

// Text Channel Mock
export const getTextChannelMock = () =>
  (({
    send: jest.fn(),
  } as unknown) as TextChannel);

// Role Mock
export const getCommandInteractionMock = (membersInVoiceChannel?: Collection<string, GuildMember>) =>
  (({
    member: {
      voice: {
        channelId: "mockedChannelId"
      }
    } as GuildMember,
    client: {
      channels: {
        fetch: (id: string, options?: FetchChannelOptions) => {
          return Promise.resolve({
            type: 2,
            members:  membersInVoiceChannel ?? getMockedMembers()
          })
        }
        }
      },
      reply: jest.fn()
  } as unknown )as CommandInteraction);

  const getMockedMembers = () => {
    const memberColl = new Collection<string, GuildMember>();
    memberColl.set("JannesId", {displayName: "Janne"} as GuildMember)
    memberColl.set("ArnesId", {displayName: "Arne"} as GuildMember)
    memberColl.set("CillasId", {displayName: "Cilla"} as GuildMember)
    return memberColl
  }
