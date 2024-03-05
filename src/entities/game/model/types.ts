export const APP_ID = 'rock-paper-scissors-web3-vanishmax';

export const PEER_HOST = `${APP_ID}_host`;

export const TURNS = ['rock', 'paper', 'scissors', 'lizard', 'spock'] as const;

export type TurnType = typeof TURNS[number];

export const STATES = [
  'waiting-auth',
  'waiting-connection',
  'waiting-for-client',
  'host-choose-turn',
  'waiting-for-host',
  'waiting-for-host-turn',
  'waiting-for-contract-deployment',
  'waiting-for-client-turn',
  'client-choose-turn',
  'waiting-for-solve-function',
] as const;

export type StateType = typeof STATES[number];

export const LOADING_STATES = [
  'waiting-connection',
  'waiting-for-client',
  'waiting-for-host',
  'waiting-for-host-turn',
  'waiting-for-contract-deployment',
  'waiting-for-client-turn',
  'waiting-for-solve-function',
] as const;

export type LoadingStateType = typeof LOADING_STATES[number];
