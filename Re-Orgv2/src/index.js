import { initializeFirebase } from './services/firebase';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Initialize Firebase before importing the app
initializeFirebase();

// Import app dependencies
import store from '@store';
import theme from '@styles/theme';
import App from '@components/Core/App';

// Create root
const container = document.getElementById('root');
const root = createRoot(container);

// Render app with all providers
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
); 