export const APP_ID = 'rock-paper-scissors-web3-vanishmax';

export const PEER_HOST = `${APP_ID}_host`;

export const CONTRACT_LOCAL_STORAGE_KEY = 'rock-paper-scissors-web3-contract';

export const TURNSALT_LOCAL_STORAGE_KEY = 'rock-paper-scissors-web3-turnsalt';

// 0.01 sETH
export const STAKE_VALUE = 10000000000000000n;

export const TIMEOUT_VALUE = 300n;

export const TURNS = ['rock', 'paper', 'scissors', 'spock', 'lizard'] as const;

type GetTurnIndexFn = {
  (turn: TurnType): number;
  (turn: number): TurnType;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTurnIndex: GetTurnIndexFn = (turn: any): any => {
  if (typeof turn === 'string') return TURNS.indexOf(turn as TurnType) + 1;
  return TURNS[turn as number - 1];
};

export type TurnType = typeof TURNS[number];

export const STATES = [
  'cant-play',
  'disconnected',
  'opponent-disconnected',
  'waiting-auth',
  'connected',
  'waiting-connection',
  'waiting-for-contract-data',
  'waiting-for-client',
  'host-choose-turn',
  'waiting-for-host',
  'waiting-for-host-turn',
  'waiting-for-contract-deployment',
  'waiting-for-client-turn',
  'client-choose-turn',
  'waiting-for-solve-function',
  'waiting-for-contract-update',
  'host-solving',
  'finish',
  'waiting-for-client-timeout',
  'waiting-for-host-timeout',
] as const;

export type StateType = typeof STATES[number];

export const LOADING_STATES = [
  'waiting-connection',
  'waiting-for-contract-data',
  'waiting-for-client',
  'waiting-for-host',
  'waiting-for-host-turn',
  'waiting-for-contract-deployment',
  'waiting-for-client-turn',
  'waiting-for-solve-function',
  'waiting-for-contract-update',
  'waiting-for-client-timeout',
  'waiting-for-host-timeout',
] as const;

export type LoadingStateType = typeof LOADING_STATES[number];
