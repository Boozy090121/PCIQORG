import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from '@store';
import { routes } from '@config/routes';
import { ErrorBoundary } from '@core/ErrorBoundary';
import { LoadingSpinner } from '@core/LoadingSpinner';
import theme from '@styles/theme';

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