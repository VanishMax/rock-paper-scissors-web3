import { FC } from 'react';
import { GameButton } from '../game-button';
import { TURNS, TurnType } from '../../model';
import styles from './styles.module.css';

export interface PlayButtonProps {
  onPlay: (turn: TurnType) => void;
}

export const PlayButton: FC<PlayButtonProps> = ({ onPlay }) => {
  return (
    <>
      <p>Please, choose your turn</p>
      <div className={styles.wrapper}>
        {TURNS.map((turn) => (
          <GameButton
            key={turn}
            type={turn}
            onClick={() => onPlay(turn)}
          />
        ))}
      </div>
    </>

  );
};
