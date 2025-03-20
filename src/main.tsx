import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { router } from './routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
      <Analytics
        beforeSend={(event) => {
          // Você pode modificar ou filtrar eventos aqui
          return event;
        }}
        debug={import.meta.env.DEV} // Ativa logs de debug em desenvolvimento
      />
    </HelmetProvider>
  </React.StrictMode>,
);
