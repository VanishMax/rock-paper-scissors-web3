import { FC, useRef } from 'react';
import { gameState, gameTimeout, isWaiting, LoadingStateType } from '../../model';
import { useSignals } from '@preact/signals-react/runtime';
import styles from './styles.module.css';
import { useSignalEffect } from '@preact/signals-react';

export interface LoaderProps {
  clientTimeout: VoidFunction;
  hostTimeout: VoidFunction;
}

export const Loader: FC<LoaderProps> = ({ clientTimeout, hostTimeout }) => {
  useSignals();

  const isTimedOut = useRef(false);

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
    'waiting-for-client-timeout': 'Your opponent doesn\'t respond. Stopping the game',
    'waiting-for-host-timeout': 'Your opponent doesn\'t respond. Stopping the game',
  };

  useSignalEffect(() => {
    if (gameTimeout.value === undefined || isTimedOut.current) return;
    if (gameTimeout.value <= 0 && gameState.value === 'waiting-for-client-turn') {
      isTimedOut.current = true;
      hostTimeout();
    } else if (gameTimeout.value <= 0 && gameState.value === 'waiting-for-solve-function') {
      isTimedOut.current = true;
      clientTimeout();
    }
  });

  if (isWaiting.value && loadingTexts?.[gameState.value as LoadingStateType]) {
    return (
      <div className={styles.loader}>
        <i className={styles.ggSpinner} />
        <p>
          {loadingTexts[gameState.value as LoadingStateType]}
        </p>
        {gameTimeout.value !== undefined && gameTimeout.value > 0 && (
          <p className={gameTimeout.value < 60 ? styles.red : ''}>
            Timeout in: {gameTimeout.value.toString()} seconds
          </p>
        )}
      </div>
    );
  }
};
