import { FC, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import styles from './styles.module.css';
import { setGameState } from 'entities/game/model';

export const Account: FC = () => {
  const { isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const injectedConnector = connectors[0];

  const onConnect = () => {
    connect({ connector: injectedConnector });
  };

  useEffect(() => {
    if (isConnected) {
      setGameState('connected');
    }
  }, [isConnected]);

  return isConnected ? (
    <button className={styles.connector} onClick={() => disconnect()}>
      Disconnect
    </button>
  ) : (
    <button className={styles.connector} onClick={onConnect}>
      {isConnecting ? 'Connecting...' : 'Connect wallet'}
    </button>
  );
};
