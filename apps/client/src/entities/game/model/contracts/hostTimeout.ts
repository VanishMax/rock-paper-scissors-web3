import { getWalletClient } from 'wagmi/actions';
import { config as wagmiConfig } from '../../../../app/wagmi';
import { writeContract } from 'viem/actions';
import type { Hex } from 'viem';

import { gameContract, setGameState } from '../store';
import { contractAbi } from './contractAbi';

/**
 * When the client doesn't respond, call this function
 */
export const hostTimeout = async () => {
  if (!gameContract.value) return;

  setGameState('waiting-for-host-timeout');

  const walletClient = await getWalletClient(wagmiConfig);
  await writeContract(walletClient, {
    address: gameContract.value as Hex,
    abi: contractAbi,
    functionName: 'j2Timeout',
  });
};
