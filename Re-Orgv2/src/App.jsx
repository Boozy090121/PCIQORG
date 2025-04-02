import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './app/store';
import { routes } from './app/routes';
import { ErrorBoundary } from './components/Core/ErrorBoundary';
import { LoadingSpinner } from './components/Core/LoadingSpinner';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

/**
 * App component that sets up the application with Redux store and theme
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                  />
                ))}
              </Routes>
            </Suspense>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 