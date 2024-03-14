import { getWalletClient } from 'wagmi/actions';
import { config as wagmiConfig } from 'app/wagmi';
import { writeContract } from 'viem/actions';
import type { Hex } from 'viem';

import { gameContract, setGameState } from '../store';
import { contractAbi } from './contractAbi';

/**
 * When the host doesn't respond, call this function
 */
export const clientTimeout = async () => {
  if (!gameContract.value) return;

  setGameState('waiting-for-client-timeout');

  const walletClient = await getWalletClient(wagmiConfig);
  await writeContract(walletClient, {
    address: gameContract.value as Hex,
    abi: contractAbi,
    functionName: 'j1Timeout',
  });
};
