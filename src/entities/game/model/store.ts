import { computed, signal } from '@preact/signals-react';
import { StateType, LOADING_STATES, LoadingStateType } from './types.ts';
import { DataConnection } from 'peerjs';

export const gameState = signal<StateType>('waiting-auth');

export const gameLogs = signal([]);

export const isGameHost = signal(false);

export const gameOpponent = signal<string | undefined>(undefined);

export const gameConnection = signal<DataConnection | undefined>(undefined);

export const gameContract = signal<string | undefined>(undefined);

export const isWaiting = computed(() => LOADING_STATES
  .includes(gameState.value as LoadingStateType));

export const setGameState = (state: StateType): void => {
  gameState.value = state;
};
