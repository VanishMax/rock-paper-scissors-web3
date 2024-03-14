import { gameTimeout, gameContract, gameOpponent, gameState, isGameHost, setGameState, stopTheGame } from '../store';
import { getContractData } from './getContractData';
import { TIMEOUT_VALUE } from 'entities/game/model';

export const syncContractStates = async (address: string, stop: VoidFunction) => {
  const res = await getContractData(gameContract.value!);

  if (res.host !== address && res.client !== address) {
    gameContract.value = undefined;
    return;
  }

  isGameHost.value = address === res.host;
  gameOpponent.value = isGameHost.value ? res.client : res.host;

  const timeout = TIMEOUT_VALUE - (BigInt(Date.now()) / 1000n - res.lastActionTime);
  if (
    (!isGameHost.value && gameState.value === 'waiting-for-solve-function')
    || (isGameHost.value && gameState.value === 'waiting-for-client-turn')
  ) {
    gameTimeout.value = timeout;
  } else {
    gameTimeout.value = undefined;
  }
  console.log(res.stake, timeout);

  if (!res.clientMove && isGameHost.value && timeout > 0n) {
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
  if (res.stake === 0n) {
    setGameState('finish');
    stopTheGame();
    stop();
  }
};
