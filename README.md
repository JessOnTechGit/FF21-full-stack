# CodeHawks First Flight #29: TwentyOne

## Work in Progress
- Make more gas efficient 
- Mitigate smart contract vulnerabilities 
- Include player scores in end of game pop up 
- Add 'waiting for other player' modals

## About the Project

The "TwentyOne" protocol is a smart contract implementation of the classic blackjack card game, where users can wager 1 ETH to participate. The game involves a player competing against a dealer, with standard blackjack rules applied. A random card drawing mechanism is implemented to mimic shuffling, and players can choose to "hit" or "stand" based on their card totals. Winning players double their wager, while losing players forfeit their initial bet.

## Actors

Actors:

    Player: The user who interacts with the contract to start and play a game. A player must deposit 1 ETH to play, with a maximum payout of 2 ETH upon winning.

    Dealer: The virtual counterpart managed by the smart contract. The dealer draws cards based on game logic.

## Compatibilities

Blockchains: Ethereum

Tokens: ETH

## Setup

Build:
```bash
git clone <repo_link>
cd contracts
forge build
```
In a new terminal, run: 
```bash
anvil 
```

In a new terminal, run: 
```bash
forge create TwentyOne --interactive --broadcast
```

For other chains:
```bash
forge create TwentyOne rpc-url 127.0.0.1:8545 --interactive --broadcast
```

Send funds to contract:
```bash
cast send <contract_address> "deposit()" --value 52e18 --rpc-url http://localhost:8545 --interactive
```

Check contract balance:
```bash
cast balance <contract_address> --rpc-url http://127.0.0.1:8545  
```
In a new terminal: 
```bash
cd frontend
npm run dev
```

## Known Issues

- Randomness Manipulation: The randomness mechanism relies on block.timestamp, msg.sender, and block.prevrandao, which may be predictable in certain scenarios. Consider using Chainlink VRF or another oracle for more secure randomness.
- https://codehawks.cyfrin.io/c/2024-11-twentyone results

## WARNINGS
These smart contracts ARE VULNERABLE. The CodeHawks First Flight competition does not constitute as a real audit, and mitigations have not been made. This was a full stack exercise, and should not be used in production.