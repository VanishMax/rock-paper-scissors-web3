import { getWalletClient, waitForTransactionReceipt } from 'wagmi/actions';
import { config as wagmiConfig } from 'app/wagmi';
import { writeContract } from 'viem/actions';
import type { Hex } from 'viem';

import { gameContract, setGameState } from '../store';
import { contractAbi } from './contractAbi';
import { getTurnIndex, STAKE_VALUE, TurnType } from '../types';
import { sendConnectionMessage } from '../peers/сonnectionMessageHandlers';

export const clientTurn = async (clientAddress: string, turn: TurnType) => {
  if (!gameContract.value) return;

  setGameState('waiting-for-contract-update');
  sendConnectionMessage('client-turn', '');

  const walletClient = await getWalletClient(wagmiConfig);
  const txHash = await writeContract(walletClient, {
    address: gameContract.value as Hex,
    account: clientAddress as Hex,
    abi: contractAbi,
    functionName: 'play',
    args: [getTurnIndex(turn)],
    value: STAKE_VALUE,
  });
  const result = await waitForTransactionReceipt(wagmiConfig, { hash: txHash });

  if (result.status === 'success') {
    setGameState('waiting-for-solve-function');
  }
};
