import { FC } from 'react';
import { GameButton } from '../game-button';
import { Turns, TurnType } from '../../model';
import styles from './styles.module.css';

export const PlayButton: FC = () => {
  const onPlay = (turn: TurnType): void => {
    console.log(turn);
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
