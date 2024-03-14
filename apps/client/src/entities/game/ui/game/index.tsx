import { FC } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { useAccount } from 'wagmi';

import { isWaiting, isGameHost, gameState, actions, TurnType, useVictory } from '../../model';
import { PlayButton } from '../play';
import { Loader } from '../loader';
import styles from './styles.module.css';
import { formatBigint } from 'shared/utils/formatBigint';

export const Game: FC = () => {
  useSignals();

  const { address } = useAccount();
  const { isWinner, balanceDiff } = useVictory();

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

  const onClientTimeout = (): void => {
    actions.clientTimeout();
  };

  const onHostTimeout = (): void => {
    actions.hostTimeout();
  };

  if (isWaiting.value) {
    return <Loader clientTimeout={onClientTimeout} hostTimeout={onHostTimeout} />;
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
        <p>Your opponent chose their turn. Finishing the game?</p>
        <button type="button" className={styles.play} onClick={onHostSolve}>
          Solve the game
        </button>
      </>
    );
  }

  if (gameState.value === 'finish' && isWinner !== undefined) {
    if (isWinner === 'tie') {
      return (
        <div className={styles.finish}>
          <h3>🤝🤝🤝 It's a tie! 🤝🤝🤝</h3>
          <p>Your balance now lacks <span className={styles.red}>{formatBigint(balanceDiff || 0n)}</span></p>
        </div>
      );
    }

    if (isWinner === 'win') {
      return (
        <div className={styles.finish}>
          <h3>🎉🎉🎉 You won! 🎉🎉🎉</h3>
          <p>You received <span className={styles.green}>{formatBigint(balanceDiff || 0n)}</span></p>
        </div>
      );
    }

    return (
      <div className={styles.finish}>
        <h3>😞😞😞 You lost! 😞😞😞</h3>
        <p>Your balance now lacks <span className={styles.red}>{formatBigint(balanceDiff || 0n)}</span></p>
      </div>
    );
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
