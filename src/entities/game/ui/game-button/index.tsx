import { FC } from 'react';
import styles from './styles.module.css';
import { TurnType } from '../../model';
import { iconMap } from './iconMap.ts';

export interface GameButtonProps {
  type: TurnType;
}

export const GameButton: FC<GameButtonProps> = ({ type }) => {
  const TurnIcon = iconMap[type];

  return (
    <button className={styles.button}>
      <TurnIcon />
    </button>
  );
};
