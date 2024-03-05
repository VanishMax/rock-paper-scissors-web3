import { setGameState } from '../store.ts';
import type { TurnType } from '../types.ts';

export const clientTurn = async (turn: TurnType) => {
  console.log('CLIENT TURN', turn);
  setGameState('waiting-for-solve-function');
  // TODO: call play function in the smart contract
};
