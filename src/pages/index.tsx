import { FC } from 'react';
import styles from './styles.module.css';
import { GameButton } from 'entities/game';

export const HomePage: FC = () => {
  return (
    <main className={styles.page}>
      <h1>Welcome</h1>

      <section className={styles.game}>
        <GameButton type="rock" />
        <GameButton type="paper" />
        <GameButton type="scissors" />
        <GameButton type="lizard" />
        <GameButton type="spock" />
      </section>
    </main>
  );
};
