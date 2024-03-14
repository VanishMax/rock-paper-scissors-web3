import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

interface GamePlayers {
  host?: string;
  client?: string;
}

const players: GamePlayers = {
  host: undefined,
  client: undefined,
}

io.on('connection', (socket) => {
  const address = socket.handshake.query.address;
  if (!address || typeof address !== 'string') {
    return;
  }
  console.log(`User connected: ${address}`);

  // Assign roles
  if (!players.host) {
    players.host = address;
    socket.emit('role', 'host');
  } else if (!players.client) {
    players.client = address;
    socket.emit('role', 'client');
    io.emit('start');
  } else {
    socket.emit('role', 'none');
    socket.disconnect();
  }

  socket.on('disconnect', () => {
    // TODO: Handle player disconnect
    if (players.host === address) {
      players.host = undefined;
    } else if (players.client === address) {
      players.client = undefined;
    }
  });
});

httpServer.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
