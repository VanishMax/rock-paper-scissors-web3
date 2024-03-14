import { deployContract as viemDeployContract } from 'viem/actions';
import { getWalletClient, waitForTransactionReceipt } from 'wagmi/actions';
import { config as wagmiConfig } from 'app/wagmi';
import { keccak256, toHex, encodePacked } from 'viem';
import type { Hex } from 'viem';

import { gameOpponent, setGameState, gameConnection, gameContract, hostTurnSalt } from '../store';
import { sendConnectionMessage } from '../peers/сonnectionMessageHandlers';
import { contractBytecode } from './contractBytecode';
import { contractAbi } from './contractAbi';
import { TurnType, getTurnIndex, STAKE_VALUE } from '../types';

export const deployContract = async (hostAddress: string, turn: TurnType) => {
  if (!gameOpponent.value || !hostAddress || !gameConnection.value) {
    return;
  }

  setGameState('waiting-for-contract-deployment');
  sendConnectionMessage('start', '');

  /**
   * Calculate hash with salt:
   * 1. Create a random 32-byte salt, convert it to a HEX (which is a correct uint256 representation in Solidity)
   * 2. Concatenate the turn number and the HEX salt
   * 3. Calculate the keccak256 hash of the concatenated value
    */
  const randomValues = new Uint8Array(32);
  window.crypto.getRandomValues(randomValues);
  const salt = toHex(randomValues) as unknown as bigint; // HEXes are bigints to Solidity
  const hashWithSalt = encodePacked(['uint8', 'uint256'], [getTurnIndex(turn), salt]);
  const gameHash = keccak256(hashWithSalt);

  // Deploy the contract and wait for the transaction receipt
  const walletClient = await getWalletClient(wagmiConfig);
  const txHash = await viemDeployContract(walletClient, {
    account: hostAddress as Hex,
    abi: contractAbi,
    bytecode: `0x${contractBytecode}`,
    args: [gameHash, gameOpponent.value],
    value: STAKE_VALUE,
  });
  const result = await waitForTransactionReceipt(wagmiConfig, { hash: txHash });

  hostTurnSalt.value = [getTurnIndex(turn), toHex(randomValues)];
  console.log('CONTRACT DEPLOYED:', result);

  if (result.contractAddress) {
    gameContract.value = result.contractAddress;
    sendConnectionMessage('contract', result.contractAddress);
    setGameState('waiting-for-client-turn');
  }
};
