import { WagmiProvider } from 'wagmi';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HomePage } from '../pages';
import { config } from './wagmi';
import './global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  </WagmiProvider>
);
