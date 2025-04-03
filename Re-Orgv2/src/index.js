import React from 'react';
import { createRoot } from 'react-dom/client';
<<<<<<< HEAD
import App from './components/Core/App/App';
import './styles/index.css';
=======
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './store';
import theme from './styles/theme';
import App from './components/Core/App/App';
import './styles/global.css';
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
  </React.StrictMode>
); 