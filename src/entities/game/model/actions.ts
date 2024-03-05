import { connectPlayers } from './peers/connectPlayers.ts';
import { deployContract } from './contracts/deployContract.ts';
import { clientTurn } from './contracts/clientTurn.ts';

export const actions = {
  connect: connectPlayers,
  deployContract,
  clientTurn,
};
