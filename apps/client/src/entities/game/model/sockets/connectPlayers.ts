import { io } from 'socket.io-client';

import { isGameHost, setGameState, gameOpponent, gameConnection, gameContract } from '../store';
import { StateType } from '../types';

const WS_ADDRESS = import.meta.env.MODE === 'production' ? 'https://rcs-server.fly.dev' : 'ws://localhost:3001';

export const connectPlayers = (address: string): void => {
  const socket = io(WS_ADDRESS, {
    query: {
      address,
    },
  });

  socket.on('connect', () => {
    gameConnection.value = socket;
  });

  socket.on('disconnect', () => {
    gameConnection.value = undefined;
    setGameState('disconnected');
  });

  socket.on('host-disconnected', () => {
    setGameState('opponent-disconnected');
  });

  socket.on('client-disconnected', () => {
    setGameState('opponent-disconnected');
  });

  socket.on('role', (role: 'host' | 'client' | 'none') => {
    if (role === 'host') {
      isGameHost.value = true;
      setGameState('waiting-for-client');
    } else if (role === 'client') {
      isGameHost.value = false;
      setGameState('waiting-for-host');
    } else {
      setGameState('cant-play');
    }
  });

  socket.on('state', (state: StateType) => {
    setGameState(state);
  });

  socket.on('start', (opponent: string) => {
    gameOpponent.value = opponent;
    if (isGameHost.value) {
      setGameState('host-choose-turn');
    } else {
      setGameState('waiting-for-host-turn');
    }
  });

  socket.on('contract', (contract: string) => {
    gameContract.value = contract;
    setGameState('client-choose-turn');
  });
};
