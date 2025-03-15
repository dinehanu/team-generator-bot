
import { commands } from "../commands";
import {
  getCommandInteractionMock
} from "../__mocks__";
import { Collection, GuildMember } from "discord.js";

describe("GuildMemberAdd Handler", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([undefined, null, new Collection<string, GuildMember>()])
  ("should return empty channel message if there are no users in the voice channel that discord says the user is connected to", async (input) => {
  const interactionMock = getCommandInteractionMock();
  interactionMock.client.channels.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    type: 2,
    members:  input
  }))
    commands.random.execute(interactionMock).then(() =>
      expect(interactionMock.reply).toHaveBeenCalledWith(
        "No one here?"
      )
    )
  });

  it("should members in a comma separated string if there are less than 5 members ", async () => {
  const interactionMock = getCommandInteractionMock();
    commands.random.execute(interactionMock).then(() =>
      expect(interactionMock.reply).toHaveBeenCalledWith(
        "DreamTeam: Janne, Arne, Cilla"
      )
    )
  });


  it.each([undefined, null, new Collection<string, GuildMember>()])
  ("should return too many members message if there are more than 8 members in voice channel", async (input) => {

    const memberColl = new Collection<string, GuildMember>();
    memberColl.set("JannesId", {displayName: "Janne"} as GuildMember)
    memberColl.set("ArnesId", {displayName: "Arne"} as GuildMember)
    memberColl.set("CillasId", {displayName: "Cilla"} as GuildMember)
    memberColl.set("MackansId", {displayName: "Mackan"} as GuildMember)
    memberColl.set("JennysId", {displayName: "Jenny"} as GuildMember)
    memberColl.set("SttoffesId", {displayName: "Stoffe"} as GuildMember)
    memberColl.set("RickesId", {displayName: "Ricke"} as GuildMember)
    memberColl.set("OllesId", {displayName: "Olle"} as GuildMember)
    memberColl.set("SmuttesId", {displayName: "Smutte"} as GuildMember)

  const interactionMock = getCommandInteractionMock(memberColl);
    commands.random.execute(interactionMock).then(() =>
      expect(interactionMock.reply).toHaveBeenCalledWith(
        "To many players!"
      )
    )
  });

});