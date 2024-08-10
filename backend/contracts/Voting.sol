// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Voting {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 voteCount;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 cutTime;
        bool isOpen;
    }
    uint256 constant ONE_WEEK =  7 * 24 * 60 * 60;
    mapping(uint256 => mapping(address => bool)) private hasVotedForProposal; //Mapping of proposal IDs to whether an address has voted for that proposal

    mapping(uint256 => uint256) OneWeek;
    // The Proposal[] public proposals line creates an array called proposals that will store all of the Proposal objects.
    Proposal[] public proposals;

    // constructor() {}
    error WEEKPASSED(uint256 blocktime, uint256 cutime);

    modifier nonEmptyString(string memory str) {
        require(bytes(str).length > 0, "String cannot be empty");
        _;
    }
    
    // Function to get time left for each cutTime in reverse order
    function howMuchTimeLeft() public view returns (uint256[] memory) {
        uint256 length = proposals.length;
        uint256[] memory timesLeft = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            uint256 index = length - 1 - i;
            if (proposals[index].cutTime > block.timestamp) {
                timesLeft[i] = proposals[index].cutTime - block.timestamp;
            } else {
                timesLeft[i] = 0; // If cutTime is in the past, return 0
            }
        }

        return timesLeft;
    }
    
    function timePassed(uint256 idProposal) public view returns (bool Open) {
        if(proposals[idProposal].cutTime <= block.timestamp){
            return false;
            //revert WEEKPASSED(block.timestamp,proposals[idProposal].cutTime);
        }
        else{
            return true;
        }
            }

    function addProposal(string memory _title, string memory _description)
        public
        nonEmptyString(_title)
        nonEmptyString(_description)
    {
        Proposal memory newProposal = Proposal({
            id: uint256(proposals.length),
            title: _title,
            description: _description,
            voteCount: 0,
            yesVotes: 0,
            noVotes: 0,
            cutTime:block.timestamp + ONE_WEEK,
            isOpen:true
        });
        proposals.push(newProposal);
        // emit ProposalAdded(newProposal.id, newProposal.title);
    }

    function vote(uint256 _proposalId, bool _yesVote) public  {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(
            !hasVotedForProposal[_proposalId][msg.sender],
            "You have already voted for this proposal"
        );
        if(upDateProposal(_proposalId)==false){
            revert WEEKPASSED (block.timestamp,proposals[_proposalId].cutTime);
        }
        if (_yesVote) {
            proposals[_proposalId].yesVotes++;
        } else {
            proposals[_proposalId].noVotes++;
        }
        proposals[_proposalId].voteCount++;
        hasVotedForProposal[_proposalId][msg.sender] = true;
    }
    function hasVoted(uint256 _proposalId, address _voter) public view returns (bool) {
        return hasVotedForProposal[_proposalId][_voter];
    }

    function upDateProsals() public {
        uint256 len= uint256(proposals.length);
        for(uint256 i=0; len>i;i++){
            upDateProposal(i);
         }
        }
    function upDateProposal(uint256 _proposalId) public returns (bool isOpen){
        bool isOpen=timePassed(_proposalId);
        proposals[_proposalId].isOpen= isOpen;
        return isOpen;
    }
    function getProposalVotes(uint256 _proposalId)
        public
        view
        returns (uint256 yesVotes, uint256 noVotes)
    {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        return (
            proposals[_proposalId].yesVotes,
            proposals[_proposalId].noVotes
        );
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}