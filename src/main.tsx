import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Intercept specific benign console errors
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : (args[0]?.message || '');
  if (msg && typeof msg === 'string' && msg.includes('Missing property')) {
    return; // Suppress Spline known runtime property missing error
  }
  originalConsoleError(...args);
};

// Also catch unhandled promises
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason?.message?.includes('Missing property')) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
