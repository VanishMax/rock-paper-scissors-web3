import { gameConnection, gameContract, gameOpponent, gameState, isGameHost, setGameState, stopTheGame } from '../store.ts';
import { getContractData } from './getContractData.ts';

export const syncContractStates = async (address: string, stop: VoidFunction) => {
  const res = await getContractData(gameContract.value!);

  if (res.host !== address && res.client !== address) {
    gameContract.value = undefined;
    return;
  }

  isGameHost.value = address === res.host;
  gameOpponent.value = isGameHost.value ? res.client : res.host;
  gameConnection.value = undefined;

  if (!res.clientMove && isGameHost.value) {
    setGameState('waiting-for-client-turn');
  }
  if (!res.clientMove && !isGameHost.value && gameState.value !== 'waiting-for-contract-update') {
    setGameState('client-choose-turn');
  }
  if (res.clientMove && !isGameHost.value && res.stake > 0n) {
    setGameState('waiting-for-solve-function');
  }
  if (res.clientMove && isGameHost.value && res.stake > 0n && gameState.value !== 'waiting-for-solve-function') {
    setGameState('host-solving');
  }
  if (res.clientMove && res.stake === 0n) {
    setGameState('finish');
    stopTheGame();
    stop();
  }
};
