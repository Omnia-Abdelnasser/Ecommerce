import { StrictMode } from 'react';

import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from '@/shared/components/ui/toaster';

import App from './app/app';
import Providers from './app/providers';
import './index.css';
import './transition.css';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Providers>
         <BrowserRouter>
            <QueryClientProvider client={queryClient}>
               <HelmetProvider>
                  {' '}
                  <App />
               </HelmetProvider>

               <Toaster />
            </QueryClientProvider>
         </BrowserRouter>
      </Providers>
   </StrictMode>
);
