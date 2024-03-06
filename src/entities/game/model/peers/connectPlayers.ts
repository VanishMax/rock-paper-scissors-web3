import { getPeer } from './getPeer.ts';
import { PEER_HOST } from '../types.ts';
import { gameOpponent, isGameHost, setGameState, gameConnection, gameContract } from '../store.ts';
import { sendConnectionMessage, receiveConnectionMessage } from './сonnectionMessageHandlers.ts';

export const connectPlayers = async (address: string) => {
  // If contract is already present in the localStorage, then the game is already started – no need for peers
  if (gameContract.value) {
    setGameState('waiting-for-contract-data');
    return;
  }

  setGameState('waiting-connection');
  const { peer, isHost } = await getPeer(address);
  isGameHost.value = isHost;

  if (isHost) {
    setGameState('waiting-for-client');

    peer.on('connection', (conn) => {
      conn.on('open', () => {
        if (conn.metadata.address) {
          gameConnection.value = conn;
          sendConnectionMessage('address', address);
          gameOpponent.value = conn.metadata.address;
          setGameState('host-choose-turn');
        }
      });

      conn.on('close', () => {
        console.warn('CONN CLOSED');
      });
    });
  } else {
    setGameState('waiting-for-host');

    const conn = peer.connect(PEER_HOST, { metadata: { address } });

    conn.on('data', (data) => {
      const { type, data: messageData } = receiveConnectionMessage(data as string);
      if (type === 'address') {
        gameOpponent.value = messageData;
        setGameState('waiting-for-host-turn');
      } else if (type === 'start') {
        setGameState('waiting-for-contract-deployment');
      } else if (type === 'contract') {
        gameContract.value = messageData;
        setGameState('client-choose-turn');
      }
    });

    conn.on('open', () => {
      gameConnection.value = conn;
    });
  }
};
