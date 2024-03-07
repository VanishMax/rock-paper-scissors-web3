import { getWalletClient, waitForTransactionReceipt } from 'wagmi/actions';
import { config as wagmiConfig } from 'app/wagmi.ts';
import { writeContract } from 'viem/actions';
import type { Hex } from 'viem';

import { gameContract, setGameState } from '../store';
import { contractAbi } from './contractAbi.ts';
import { getTurnIndex, STAKE_VALUE, TurnType } from '../types.ts';
import { sendConnectionMessage } from '../peers/сonnectionMessageHandlers.ts';

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
