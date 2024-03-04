import { FC } from 'react';
import { GameButton } from '../game-button';
import { Turns, TurnType } from '../../model';
import styles from './styles.module.css';
import { useAccount, useConnect } from 'wagmi';

export const PlayButton: FC = () => {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const injectedConnector = connectors[0];

  const onPlay = (turn: TurnType): void => {
    if (!isConnected) {
      connect({ connector: injectedConnector });
    } else {
      alert(turn);
    }
  };

  return (
    <div className={styles.wrapper}>
      {Turns.map((turn) => (
        <GameButton
          key={turn}
          type={turn}
          onClick={() => onPlay(turn)}
        />
      ))}
    </div>
  );
};
