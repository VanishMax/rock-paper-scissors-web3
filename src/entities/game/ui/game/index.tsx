import { FC } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { useAccount } from 'wagmi';

import { isWaiting, isGameHost, gameState, actions, TurnType } from '../../model';
import { PlayButton } from '../play';
import { Loader } from '../loader';
import styles from './styles.module.css';

export const Game: FC = () => {
  useSignals();
  const { address } = useAccount();

  actions.sync();

  const onConnect = (): void => {
    actions.connect(address!);
  };

  const onHostPlay = (turn: TurnType): void => {
    actions.deployContract(address!, turn);
  };

  const onClientPlay = (turn: TurnType): void => {
    actions.clientTurn(address!, turn);
  };

  const onHostSolve = (): void => {
    actions.hostSolve(address!);
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

  if (gameState.value === 'host-solving') {
    return (
      <>
        <p>Your opponent choose their turn. Finishing the game?</p>
        <button type="button" className={styles.play} onClick={onHostSolve}>
          Solve the game
        </button>
      </>
    );
  }

  if (gameState.value === 'victory') {
    return <div>Victory!!!</div>;
  }

  return (
    <>
      <p>This is an extended Rock Paper Scissors game. Are you ready to start the game?</p>
      <button type="button" className={styles.play} onClick={onConnect}>
        Play
      </button>
    </>
  );
};
