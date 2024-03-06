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
        <h1>Welcome!</h1>
        <Account />
      </header>

      {isConnected ? (
        <>
          <Game />
        </>
      ) : (
        <>
          <p>This is an extended Rock Paper Scissors game. If you win, receive 0.1 sETH!</p>
          <p>Please connect your wallet to play</p>
        </>
      )}
    </main>
  );
};
