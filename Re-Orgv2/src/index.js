import { initializeFirebase } from './services/firebase';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Initialize Firebase before importing the app
initializeFirebase();

// Import App component
import App from '@components/Core/App';

// Create root
const container = document.getElementById('root');
const root = createRoot(container);

// Render app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 