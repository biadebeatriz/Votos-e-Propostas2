export const WHITELIST_CONTRACT_ADDRESS =
  "0x129dde52b549735AD985d3B78a4B3AF052259d95";
export const abi =[
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "blocktime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cutime",
        "type": "uint256"
      }
    ],
    "name": "WEEKPASSED",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      }
    ],
    "name": "addProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposalVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "yesVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "noVotes",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProposals",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "voteCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "yesVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "noVotes",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "cutTime",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isOpen",
            "type": "bool"
          }
        ],
        "internalType": "struct Voting.Proposal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "howMuchTimeLeft",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "yesVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "noVotes",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "cutTime",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isOpen",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "idProposal",
        "type": "uint256"
      }
    ],
    "name": "timePassed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "Open",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "upDateProposal",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isOpen",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "upDateProsals",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "_yesVote",
        "type": "bool"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]