import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
// Self-hosted fonts (font-display: swap, latin subsets bundled by Vite)
import '@fontsource-variable/manrope';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/500-italic.css';
import './index.css';
import 'lenis/dist/lenis.css';

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
