import { connectPlayers } from './peers/connectPlayers.ts';
import { deployContract } from './contracts/deployContract.ts';
import { clientTurn } from './contracts/clientTurn.ts';
import { hostSolve } from './contracts/hostSolve.ts';
import { useReadGameContract } from './contracts/useReadContract.ts';

export const actions = {
  connect: connectPlayers,
  sync: useReadGameContract,
  deployContract,
  clientTurn,
  hostSolve,
};
