import React from 'react';
import { WagmiProvider } from 'wagmi';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HomePage } from 'pages/index.tsx';
import { config } from './wagmi.ts';
import './global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
