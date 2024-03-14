import { connectPlayers } from './sockets/connectPlayers';
import { deployContract } from './contracts/deployContract';
import { clientTurn } from './contracts/clientTurn';
import { hostSolve } from './contracts/hostSolve';
import { useReadGameContract } from './contracts/useReadContract';
import { hostTimeout } from './contracts/hostTimeout';
import { clientTimeout } from './contracts/clientTimeout';

export const actions = {
  connect: connectPlayers,
  sync: useReadGameContract,
  deployContract,
  clientTurn,
  hostSolve,
  hostTimeout,
  clientTimeout,
};
