import { computed, effect, signal } from '@preact/signals-react';
import { DataConnection } from 'peerjs';
import { StateType, LOADING_STATES, LoadingStateType, CONTRACT_LOCAL_STORAGE_KEY } from './types.ts';

export const gameState = signal<StateType>('waiting-auth');

export const gameLogs = signal([]);

export const isGameHost = signal(false);

export const gameOpponent = signal<string | undefined>(undefined);

export const gameConnection = signal<DataConnection | undefined>(undefined);

export const gameContract = signal<string | undefined>(localStorage.getItem(CONTRACT_LOCAL_STORAGE_KEY) || undefined);

effect(() => {
  localStorage.setItem(CONTRACT_LOCAL_STORAGE_KEY, gameContract.value || '');
});

export const isWaiting = computed(() => LOADING_STATES
  .includes(gameState.value as LoadingStateType));

export const setGameState = (state: StateType): void => {
  gameState.value = state;
};
