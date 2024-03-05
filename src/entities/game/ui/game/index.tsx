import { FC, useEffect } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { useAccount } from 'wagmi';

import { isWaiting, isGameHost, gameState, actions, TurnType } from '../../model';
import { PlayButton } from '../play';
import { Loader } from '../loader';

export const Game: FC = () => {
  useSignals();
  const { address } = useAccount();

  useEffect(() => {
    actions.connect(address!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHostPlay = (turn: TurnType): void => {
    actions.deployContract(address!, turn);
  };

  const onClientPlay = (turn: TurnType): void => {
    actions.clientTurn(turn);
  };

  if (isWaiting.value) {
    return <Loader />;
  }

  if (isGameHost.value) {
    if (gameState.value === 'host-choose-turn') {
      return <PlayButton onPlay={onHostPlay} />;
    }
  } else {
    if (gameState.value === 'client-choose-turn') {
      return <PlayButton onPlay={onClientPlay} />;
    }
  }

  return (
    <div>Remove me</div>
  );
};
