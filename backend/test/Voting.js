const { expect } = require("chai");

describe("Voting contract", function () {
  let Voting;
  let voting;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
    await voting.deployed();
  });

  describe("addProposal", function () {
    it("should add a new proposal", async function () {
      const title = "New proposal";
      const description = "This is a new proposal.";
      const tx = await voting.addProposal(title, description);

      //   expect(tx).to.emit(voting, "ProposalAdded").withArgs(0, title);

      const proposal = await voting.proposals(0);
      expect(proposal.id).to.equal(0);
      expect(proposal.title).to.equal(title);
      expect(proposal.description).to.equal(description);
      expect(proposal.voteCount).to.equal(0);
      expect(proposal.yesVotes).to.equal(0);
      expect(proposal.noVotes).to.equal(0);
    });
    it("should add multiple proposals", async function () {
      const titles = ["Proposal 1", "Proposal 2", "Proposal 3"];
      const descriptions = [
        "This is the first proposal",
        "This is the second proposal",
        "This is the third proposal",
      ];
      for (let i = 0; i < titles.length; i++) {
        const tx = await voting.addProposal(titles[i], descriptions[i]);
        expect(tx).to.emit(voting, "ProposalAdded").withArgs(i, titles[i]);

        const proposal = await voting.proposals(i);
        expect(proposal.id).to.equal(i);
        expect(proposal.title).to.equal(titles[i]);
        expect(proposal.description).to.equal(descriptions[i]);
        expect(proposal.voteCount).to.equal(0);
        expect(proposal.yesVotes).to.equal(0);
        expect(proposal.noVotes).to.equal(0);
      }
    });
    it("should revert if title is empty", async function () {
      await expect(
        voting.addProposal("", "This is a description")
      ).to.be.revertedWith("String cannot be empty");
    });
  });

  describe("vote", function () {
    it("should vote for a proposal", async function () {
      const title = "New proposal";
      const description = "This is a new proposal.";
      await voting.addProposal(title, description);

      const tx = await voting.vote(0, true);
      expect(tx).to.emit(voting, "VoteAdded").withArgs(0, true);

      const proposal = await voting.proposals(0);
      expect(proposal.id).to.equal(0);
      expect(proposal.title).to.equal(title);
      expect(proposal.description).to.equal(description);
      expect(proposal.voteCount).to.equal(1);
      expect(proposal.yesVotes).to.equal(1);
      expect(proposal.noVotes).to.equal(0);
    });
  });

  describe("user can't vote twice on the same proposal", function () {
    it("should revert if user has already voted", async function () {
      const title = "New proposal";
      const description = "This is a new proposal.";
      await voting.addProposal(title, description);

      await voting.vote(0, true);
      await expect(voting.vote(0, true)).to.be.revertedWith(
        "You have already voted for this proposal"
      );
    });
    it("uer should be able to vote on a different", async function () {
      const title = "1st proposal";
      const description = "This is the 1st proposal.";
      await voting.addProposal(title, description);

      const secondTitle = "2nd proposal";
      const secondDesc = "This is the 2nd proposal.";
      await voting.addProposal(secondTitle, secondDesc);

      await voting.vote(0, true);
      await expect(voting.vote(0, true)).to.be.revertedWith(
        "You have already voted for this proposal"
      );
      await voting.vote(1, true);
      const proposal = await voting.proposals(1);
      expect(proposal.id).to.equal(1);
      expect(proposal.title).to.equal(secondTitle);
      expect(proposal.description).to.equal(secondDesc);
      expect(proposal.voteCount).to.equal(1);
      expect(proposal.yesVotes).to.equal(1);
      expect(proposal.noVotes).to.equal(0);
    });
  });

  describe("getProposal", function () {
    it("should return a proposal", async function () {
      const title = "New proposal";
      const description = "This is a new proposal.";
      await voting.addProposal(title, description);

      //should call getProposals function and return an array of proposals
      const proposals = await voting.getProposals();
      expect(proposals.length).to.equal(1);
      expect(proposals[0].id).to.equal(0);
      expect(proposals[0].title).to.equal(title);
      expect(proposals[0].description).to.equal(description);
      expect(proposals[0].voteCount).to.equal(0);
      expect(proposals[0].yesVotes).to.equal(0);
      expect(proposals[0].noVotes).to.equal(0);
    });
  });
});