import { FC, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

import { PEER_HOST } from './types.ts';
import { getPeer } from './connectToOpponent.ts';

export const GameConnection: FC = () => {
  const { address } = useAccount();

  const [isLoading, setIsLoading] = useState(false);
  const [host, setHost] = useState(false);
  const [opponent, setOpponent] = useState<string>();

  useEffect(() => {
    const connect = async () => {
      setIsLoading(true);

      const { peer, isHost } = await getPeer(address!);
      setHost(isHost);

      if (isHost) {
        peer.on('connection', (conn) => {
          if (conn.metadata.address) {
            setTimeout(() => {
              conn.send(address);
              setOpponent(conn.metadata.address);
              setIsLoading(false);
            }, 500);
          }
        });
      } else {
        const conn = peer.connect(PEER_HOST, { metadata: { address } });
        conn.on('open', () => {
          conn.on('data', (data) => {
            setOpponent(data as string);
            setIsLoading(false);
          });
        });
      }
    };
    connect();
  }, []);

  if (isLoading) {
    return (
      <div>
        {host ? 'Waiting for other player...' : 'Loading...'}
      </div>
    );
  }

  return (
    <div>Connected!!! Your opponent is {opponent}</div>
  );
};
