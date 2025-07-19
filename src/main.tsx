import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { TreasureProvider } from './context/TreasureContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TreasureProvider>
          <App />
        </TreasureProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);