module.exports = {
  abi: [
    {
      type: "constructor",
      inputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "activeGame",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "dealersHand",
      inputs: [
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "deposit",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "getDealerCards",
      inputs: [
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getPlayerCards",
      inputs: [
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "hit",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "playersHand",
      inputs: [
        {
          name: "player",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "stand",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256[]",
          internalType: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "startGame",
      inputs: [],
      outputs: [],
      stateMutability: "payable",
    },
    {
      type: "function",
      name: "withdrawRemainingEther",
      inputs: [
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "FeeWithdrawn",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: false,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "GameOver",
      inputs: [
        {
          name: "dealersCards",
          type: "uint256[]",
          indexed: false,
          internalType: "uint256[]",
        },
        {
          name: "playersCards",
          type: "uint256[]",
          indexed: false,
          internalType: "uint256[]",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "PlayerLostTheGame",
      inputs: [
        {
          name: "message",
          type: "string",
          indexed: false,
          internalType: "string",
        },
        {
          name: "cardsTotal",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "PlayerWonTheGame",
      inputs: [
        {
          name: "message",
          type: "string",
          indexed: false,
          internalType: "string",
        },
        {
          name: "cardsTotal",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
  ],
};
