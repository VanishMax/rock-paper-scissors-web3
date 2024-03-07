import { FC } from 'react';
import styles from './styles.module.css';
import { Game } from 'entities/game';
import { Account } from 'entities/user';
import { useAccount } from 'wagmi';

export const HomePage: FC = () => {
  const { isConnected } = useAccount();

  return (
    <main className={styles.page}>
      <header>
        <h1>RPS Web 3</h1>
        <Account />
      </header>

      {isConnected ? (
        <>
          <Game />
        </>
      ) : (
        <>
          <p>This is an extended Rock Paper Scissors game. If you win, <b>receive 0.1 sETH!</b></p>
          <p>Please connect your wallet with <b>Sepolia network</b> to play</p>
          <p>Note: the preferred wallet is Metamask</p>
        </>
      )}
    </main>
  );
};
