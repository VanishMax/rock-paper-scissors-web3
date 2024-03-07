import { getWalletClient } from 'wagmi/actions';
import { config as wagmiConfig } from 'app/wagmi.ts';
import { writeContract } from 'viem/actions';
import type { Hex } from 'viem';

import { gameContract, hostTurnSalt, setGameState } from '../store';
import { contractAbi } from './contractAbi.ts';

export const hostSolve = async (hostAddress: string) => {
  if (!gameContract.value || !hostTurnSalt.value) return;

  setGameState('waiting-for-solve-function');

  const walletClient = await getWalletClient(wagmiConfig);
  await writeContract(walletClient, {
    address: gameContract.value as Hex,
    account: hostAddress as Hex,
    abi: contractAbi,
    functionName: 'solve',
    args: [hostTurnSalt.value[0], hostTurnSalt.value[1]],
  });
};
