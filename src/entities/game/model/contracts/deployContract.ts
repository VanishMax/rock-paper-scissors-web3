import { gameOpponent, setGameState, gameConnection } from '../store.ts';
import { sendConnectionMessage } from '../peers/сonnectionMessageHandlers.ts';
import type { TurnType } from '../types.ts';

export const deployContract = async (hostAddress: string, turn: TurnType) => {
  if (!gameOpponent.value || !hostAddress || !gameConnection.value) {
    return;
  }

  setGameState('waiting-for-contract-deployment');
  console.log('DEPLOYING', turn, hostAddress, gameOpponent.value);
  sendConnectionMessage('start', '');
  // TODO: deploy contract

  setTimeout(() => {
    sendConnectionMessage('contract', '0x1234567890');
    setGameState('waiting-for-client-turn');
  }, 3000);
};
