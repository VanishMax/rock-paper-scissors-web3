import { gameConnection } from '../store.ts';

type ConnectionMessageType = 'address' | 'start' | 'contract';

export const sendConnectionMessage = (type: ConnectionMessageType, message: string) => {
  if (!gameConnection.value) return;

  gameConnection.value.send(JSON.stringify({ type: type, data: message }));
};

export const receiveConnectionMessage = (message: string) => {
  return JSON.parse(message) as { type: ConnectionMessageType, data: string };
};
