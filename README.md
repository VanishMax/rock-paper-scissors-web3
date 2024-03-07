# Rock Paper Scissors Web 3 implementation

This is an extended Rock Paper Scissors (with Lizard and Spock) game built using TypeScript, React, [Wagmi](https://wagmi.sh/) and [Viem](https://viem.sh/). 
The game utilizes pre-existing [RPS smart contract made by @Clesaege](https://github.com/clesaege/RPS/blob/master/RPS.sol). 

In this game, the smart contract is deployed for each play. Two parties stake their ETH, make their move, and receive distributed ETH back: the winner gets all, the loser gets nothing, a tie splits the amount.

Try the deployed game [here](https://rps-web3.vercel.app/). Make sure your have a web3 wallet (preferably [Metamask](https://metamask.io/)) installed and connected to the [Sepolia network](https://moralis.io/how-to-add-the-sepolia-network-to-metamask-full-guide/).

Also, check the [demo video](https://drive.google.com/file/d/1qroCJFNaipwjnzd3JF-rL4al0BDj1H_C/view?usp=sharing).

## Technical details

This project is built around the single [Solidity smart contract made by @Clesaege](https://github.com/clesaege/RPS/blob/master/RPS.sol). It is special because:
1. To play, the contract needs to be deployed for each game.
2. Opponent's address has to be known in advance, before contract deployment.
3. The contract doesn't emit events, so the game state is not directly observable.
4. The contract doesn't have a "finished" state, so it is not exactly straightforward to determine the game outcome: who's won, and who's lost.

To make the game work and keep is as decentralized as possible, the following steps were taken:
1. Opponent lookup is done using WebRTC with the help of [peer.js library](https://peerjs.com/). The library is only used to signal about the opponent's existence and determine who is the host of the game. Then, the players communicate directly without any servers. 
2. When the host chooses their turn, they deploy the contract with the opponent's address, their hashed move and the stake value. The contract address is then sent to the opponent using WebRTC.
3. When the contract is deployed, the WebRTC connection stops. Players subscribe to contract updates with long polling.
4. When the second player makes their move, the contract is updated, the stake is doubled.
5. Then, the contract is solved by the host, and the game outcome is determined. The stake is distributed accordingly.
6. If some of the steps take more than 5 minutes, the contract time outs and the stake is returned to the players.

All contract communication is managed with [Viem library](https://viem.sh/).

The code is structured according to [Feature-Sliced design](https://feature-sliced.design/).

## Running locally

Prerequisites:  
1. node.js (version 18.0.0 or later)
2. pnpm (version 8.15.0 or later)
3. MetaMask browser extension with [Sepolia network](https://moralis.io/how-to-add-the-sepolia-network-to-metamask-full-guide/)

To run the project locally, firstly install the dependencies:

```bash
pnpm install
```

Then, start the development server:

```bash
pnpm dev
```
