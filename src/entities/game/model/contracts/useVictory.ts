import { useAccount, useBalance } from 'wagmi';
import { useEffect, useRef, useState } from 'react';
import { useSignalEffect } from '@preact/signals-react';
import { gameState, STAKE_VALUE } from 'entities/game/model';

export const useVictory = () => {
  const { address } = useAccount();
  const { data: balance, refetch } = useBalance({ address, query: { refetchInterval: false } });

  const initialBalance = useRef<bigint>();
  const [isWinner, setIsWinner] = useState<'win' | 'tie' | 'lose' | undefined>(undefined);
  const [balanceDiff, setBalanceDiff] = useState<bigint | undefined>(undefined);

  const checkVictory = async () => {
    const newBalance = await refetch();
    if (!newBalance.data || !initialBalance.current) return;

    const bDiff = newBalance.data.value - initialBalance.current;
    if (bDiff < 0n && -1n * bDiff < STAKE_VALUE / 3n) {
      setIsWinner('tie');
    } else if (newBalance.data.value > initialBalance.current) {
      setIsWinner('win');
    } else {
      setIsWinner('lose');
    }
    setBalanceDiff(bDiff);
  };

  useEffect(() => {
    if (balance?.value && !initialBalance.current) {
      initialBalance.current = balance.value;
    }
  }, [balance]);

  useSignalEffect(() => {
    if (gameState.value === 'finish') {
      checkVictory();
    }
  });

  return { isWinner, balanceDiff };
};
