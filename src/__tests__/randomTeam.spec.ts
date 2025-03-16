
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
  ("should return empty channel message if the users voice channel is %s", (input) => {
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

  it("should print members in a comma separated string if there are less than 5 members ", () => {
  const interactionMock = getCommandInteractionMock();
    commands.random.execute(interactionMock).then(() =>
      expect(interactionMock.reply).toHaveBeenCalledWith(
        "DreamTeam: Janne, Arne, Cilla"
      )
    )
  });


  it("should return too many members message if there are more than 8 members in voice channel", () => {

    
    const memberColl = getMockedMembersCollection(9)

  const interactionMock = getCommandInteractionMock(memberColl);
    commands.random.execute(interactionMock).then(() =>
      expect(interactionMock.reply).toHaveBeenCalledWith(
        "To many players!"
      )
    )
  });

  it.each([5,6,7,8])("should return two teams if there are %d members in channel", (numberOfMembers: any) => {

    const memberColl = getMockedMembersCollection(numberOfMembers)

  const interactionMock = getCommandInteractionMock(memberColl);
    commands.random.execute(interactionMock).then(() =>{
      expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("**Team 1**"));
      expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("**Team 2**"));
      expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Janne"));
      expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Arne"));
      expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Cilla"));
      expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Mackan"));
      expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Jenny"));

      if(numberOfMembers > 5){
        expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Stoffe"));
      } else if (numberOfMembers > 6) {
        expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Ricke"));
      } else if (numberOfMembers > 7) {
        expect(interactionMock.reply).toHaveBeenCalledWith(expect.stringContaining("Olle"));
      }
    }
    )
  });

  //Expects at most 8 members to be generated out of lazziness
  const getMockedMembersCollection = (collectionSize: 1|2|3|4|5|6|7|8|9) => {
    const names = ["Janne","Arne","Cilla","Mackan","Jenny","Stoffe",
                  "Ricke","Olle","Smutte"]
    const memberColl = new Collection<string, GuildMember>();
    for (let index = 0; index < collectionSize; index++) {
      memberColl.set(names[index]+"Id", {displayName: names[index]} as GuildMember)
    }
    return memberColl;
  }
  


});