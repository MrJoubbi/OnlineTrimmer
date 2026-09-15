import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './i18n/LanguageContext.tsx';

// Ensure window.fetch has both getter and setter in all browser/iframe environments
if (typeof window !== 'undefined') {
  try {
    const originalFetch = window.fetch;
    let currentFetch = originalFetch;
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (!desc || desc.configurable) {
      Object.defineProperty(window, 'fetch', {
        get: () => currentFetch || originalFetch,
        set: (fn) => {
          currentFetch = fn;
        },
        configurable: true,
        enumerable: true,
      });
    }
  } catch {
    // Non-configurable window.fetch in strict sandbox
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);

