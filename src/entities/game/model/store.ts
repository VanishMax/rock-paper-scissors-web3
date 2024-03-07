import { computed, effect, signal } from '@preact/signals-react';
import { DataConnection } from 'peerjs';
import { StateType, LOADING_STATES, LoadingStateType, CONTRACT_LOCAL_STORAGE_KEY, TURNSALT_LOCAL_STORAGE_KEY } from './types.ts';

export const gameState = signal<StateType>('waiting-auth');

export const isGameHost = signal(false);

export const gameOpponent = signal<string | undefined>(undefined);

export const gameConnection = signal<DataConnection | undefined>(undefined);

export const gameTimeout = signal<bigint | undefined>(undefined);

export const gameContract = signal<string | undefined>(localStorage.getItem(CONTRACT_LOCAL_STORAGE_KEY) || undefined);

effect(() => {
  localStorage.setItem(CONTRACT_LOCAL_STORAGE_KEY, gameContract.value || '');
});

const getHostTurnSalt = () => {
  const item = localStorage.getItem(TURNSALT_LOCAL_STORAGE_KEY);
  if (!item) return undefined;

  const splitted = item.split('-');
  if (!splitted || splitted.length !== 2) return undefined;

  return [parseInt(splitted[0]), splitted[1]];
};

export const hostTurnSalt = signal<[number, string] | undefined>(getHostTurnSalt() as [number, string] | undefined);

effect(() => {
  if (!hostTurnSalt.value) localStorage.setItem(TURNSALT_LOCAL_STORAGE_KEY, '');
  else localStorage.setItem(TURNSALT_LOCAL_STORAGE_KEY, `${hostTurnSalt.value?.[0]}-${hostTurnSalt.value?.[1]}`);
});

export const isWaiting = computed(() => LOADING_STATES
  .includes(gameState.value as LoadingStateType));

export const setGameState = (state: StateType): void => {
  gameState.value = state;
};

export const stopTheGame = () => {
  gameConnection.value = undefined;
  gameContract.value = undefined;
  hostTurnSalt.value = undefined;
};
