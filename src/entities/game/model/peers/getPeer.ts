import { Peer } from 'peerjs';
import { APP_ID, PEER_HOST } from '../types.ts';

export const getPeer = (address: string): Promise<{ peer: Peer; isHost: boolean }> => {
  return new Promise((resolve) => {
    const peer = new Peer(PEER_HOST);

    // If peer creation encounters an error, then the host is taken – create client
    peer.on('error', (err) => {
      if (err.type === 'unavailable-id') {
        const clientPeer = new Peer(`${APP_ID}_${address}`);

        clientPeer.on('open', () => {
          resolve({ peer: clientPeer, isHost: false });
        });
      } else {
        console.error(err.type, err.message);
      }
    });

    // If the peer is created successfully, then it's the host
    peer.on('open', () => {
      resolve({ peer, isHost: true });
    });
  });
};
