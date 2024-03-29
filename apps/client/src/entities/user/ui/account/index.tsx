import { FC, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useSignals } from '@preact/signals-react/runtime';
import { setGameState, stopTheGame, } from 'entities/game/model';
import styles from './styles.module.css';

export const Account: FC = () => {
  useSignals();
  const { isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const injectedConnector = connectors[0];

  const onConnect = () => {
    connect({ connector: injectedConnector });
  };

  const onDisconnect = () => {
    disconnect();
    stopTheGame();
  };

  useEffect(() => {
    if (isConnected) {
      setGameState('connected');
    }
  }, [isConnected]);

  return isConnected ? (
    <button className={styles.connector} onClick={onDisconnect}>
      Disconnect
    </button>
  ) : (
    <button className={styles.connector} onClick={onConnect}>
      {isConnecting ? 'Connecting...' : 'Connect wallet'}
    </button>
  );
};
