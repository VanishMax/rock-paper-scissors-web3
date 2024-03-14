import { FC } from 'react';
import clsx from 'clsx';

import { TurnType } from '../../model';
import { iconMap } from './iconMap';
import styles from './styles.module.css';

export interface GameButtonProps {
  type: TurnType;
  disabled?: boolean;
  className?: string;
  onClick: VoidFunction;
}

export const GameButton: FC<GameButtonProps> = ({
  type,
  disabled,
  className,
  onClick,
}) => {
  const TurnIcon = iconMap[type];

  return (
    <button disabled={disabled} className={clsx(styles.button, className)} onClick={onClick}>
      <TurnIcon />
      {type}
    </button>
  );
};
