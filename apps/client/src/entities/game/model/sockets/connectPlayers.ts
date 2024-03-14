import { io } from 'socket.io-client';

import { isGameHost, setGameState } from '../store';

const WS_ADDRESS = 'ws://localhost:3001';

export const connectPlayers = (address: string): void => {
  const socket = io(WS_ADDRESS, {
    query: {
      address,
    },
  });

  socket.on('role', (role: 'host' | 'client' | 'none') => {
    if (role === 'host') {
      isGameHost.value = true;
      setGameState('waiting-for-client');
    } else if (role === 'client') {
      isGameHost.value = false;
      setGameState('waiting-for-host');
    }
    console.log('ROLE', role);
  });

  socket.on('start', () => {
    console.log('GAME START');
  });
};
