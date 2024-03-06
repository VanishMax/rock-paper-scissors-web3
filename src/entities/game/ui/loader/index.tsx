import { FC } from 'react';
import { gameState, isWaiting, LoadingStateType } from '../../model';
import { useSignals } from '@preact/signals-react/runtime';
import styles from './styles.module.css';

export const Loader: FC = () => {
  useSignals();

  const loadingTexts: Record<LoadingStateType, string> = {
    'waiting-connection': 'Waiting for connection',
    'waiting-for-contract-data': 'Waiting for contract data',
    'waiting-for-client': 'Waiting for client to connect',
    'waiting-for-host': 'Waiting for host to connect',
    'waiting-for-host-turn': 'Waiting for host to choose their turn',
    'waiting-for-client-turn': 'Waiting for client to choose their turn',
    'waiting-for-contract-deployment': 'Waiting for contract deployment',
    'waiting-for-solve-function': 'Waiting for the game to finish',
    'waiting-for-contract-update': 'Waiting for contract update',
  };

  if (isWaiting.value && loadingTexts?.[gameState.value as LoadingStateType]) {
    return (
      <div className={styles.loader}>
        <i className={styles.ggSpinner} />
        <p>
          {loadingTexts[gameState.value as LoadingStateType]}
        </p>
      </div>
    );
  }
};
