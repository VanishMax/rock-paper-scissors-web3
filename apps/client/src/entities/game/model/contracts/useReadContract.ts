import { useSignals } from '@preact/signals-react/runtime';
import { useSignalEffect } from '@preact/signals-react';
import { useAccount } from 'wagmi';

import { gameContract } from '../store';
import { syncContractStates } from './syncContractStates';

export const useReadGameContract = () => {
  useSignals();
  const { address } = useAccount();

  useSignalEffect(() => {
    let interval = 0;

    if (gameContract.value && address) {
      syncContractStates(address, () => clearInterval(interval));
      interval = setInterval(
        () => syncContractStates(address, () => clearInterval(interval)),
        2000,
      ) as unknown as number;
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  });
};
