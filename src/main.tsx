import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark');
};

createRoot(rootElement).render(
  <StrictMode>
    <button onClick={toggleDarkMode} className="fixed top-4 right-4 p-2 bg-gray-800 text-white rounded">
      Toggle Dark Mode
    </button>
    <App />
  </StrictMode>,
);