import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer, {
  cors: {
    origin: '*',
  },
});

interface Player {
  socket: Socket;
  address: string;
}

interface GameState {
  host?: Player;
  client?: Player;
  contract?: string;
}

const gameState: GameState = {
  host: undefined,
  client: undefined,
  contract: undefined,
}

const startGame = () => {
  if (!gameState.host || !gameState.client) {
    return;
  }

  gameState.host.socket.emit('start', gameState.client.address);
  gameState.client.socket.emit('start', gameState.host.address);
};

const logPlayers = () => {
  console.log(`Host: ${gameState.host?.address || 'none'}, Client: ${gameState.client?.address || 'none'}`);
};

io.on('connection', (socket) => {
  const address = socket.handshake.query.address;
  if (!address || typeof address !== 'string') {
    return;
  }

  // Assign roles
  if (!gameState.host) {
    gameState.host = { socket, address};
    socket.emit('role', 'host');
  } else if (!gameState.client) {
    gameState.client = { socket, address};
    socket.emit('role', 'client');
    startGame();
  } else {
    socket.emit('role', 'none');
    socket.disconnect();
  }

  logPlayers();

  socket.on('disconnect', () => {
    if (gameState.host?.address === address) {
      gameState.host = undefined;
      gameState.client?.socket.emit('host-disconnected');
    } else if (gameState.client?.address === address) {
      gameState.client = undefined;
      gameState.host?.socket.emit('client-disconnected');
    }

    if (!gameState.host && !gameState.client) {
      gameState.contract = undefined;
    }

    logPlayers();
  });

  socket.on('forward-state', (state: string) => {
    if (gameState.host?.address === address) {
      gameState.client?.socket.emit('state', state);
    } else if (gameState.client?.address === address) {
      gameState.host?.socket.emit('state', state);
    }
  });

  socket.on('contract', (address: string) => {
    gameState.contract = address;
    gameState.client?.socket.emit('contract', address);
  });
});

httpServer.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
