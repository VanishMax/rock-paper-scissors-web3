import { FC } from 'react';
import styles from './styles.module.css';
import { PlayButton, GameConnection } from 'entities/game';
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
          <GameConnection />
          <br />

          <p>Choose your turn</p>
          <PlayButton />
        </>
      ) : (
        <>
          <p>This is an extended Rock Paper Scissors game.</p>
          <p>Please connect your wallet to play</p>
        </>
      )}
    </main>
  );
};
