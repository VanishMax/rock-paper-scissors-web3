import { FC } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import styles from './styles.module.css';

export const Account: FC = () => {
  const { isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect } = useConnect();
  const injectedConnector = connectors[0];

  return isConnected ? (
    <button className={styles.connector} onClick={() => disconnect()}>
      Disconnect
    </button>
  ) : (
    <button className={styles.connector} onClick={() => connect({connector: injectedConnector})}>
      {isConnecting ? 'Connecting...' : 'Connect wallet'}
    </button>
  );
};
