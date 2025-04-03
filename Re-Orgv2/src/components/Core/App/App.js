import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography, Button, Paper, TextField } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import orgChartReducer from '../../../../features/OrgChart/orgChartSlice';
import OrgChartView from '../../OrgChart/OrgChartView';

// Create Redux store
const store = configureStore({
  reducer: {
    orgChart: orgChartReducer,
  },
});

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

// Minimal Login component
function SimpleLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  
  const handleLogin = () => {
    if (username.trim()) {
      onLogin({ username });
    }
  };
  
  const handleDemoLogin = () => {
    onLogin({ username: 'Demo User' });
  };
  
  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>Sign In</Typography>
      
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLogin}
          disabled={!username.trim()}
        >
          Sign In
        </Button>
        
        <Button 
          variant="outlined" 
          onClick={handleDemoLogin}
        >
          Demo Login
        </Button>
      </Box>
    </Paper>
  );
}

// Simple header component
function SimpleHeader({ username, onLogout }) {
  return (
    <Box sx={{ 
      bgcolor: 'primary.main', 
      color: 'white', 
      p: 2, 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1100
    }}>
      <Typography variant="h6">
        Organization Manager
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2">
          {username}
        </Typography>
        <Button 
          variant="outlined" 
          color="inherit" 
          size="small" 
          onClick={onLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

// Main App component
function App() {
  const [user, setUser] = useState(null);
  
  const handleLogin = (userData) => {
    setUser(userData);
  };
  
  const handleLogout = () => {
    setUser(null);
  };
  
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {user ? (
          <>
            <SimpleHeader username={user.username} onLogout={handleLogout} />
            <Box sx={{ mt: 8, p: 2 }}>
              <Container maxWidth="xl">
                <OrgChartView />
              </Container>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              p: 2,
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              sx={{ mb: 4 }}
            >
              Organization Management System
            </Typography>
            <SimpleLogin onLogin={handleLogin} />
          </Box>
        )}
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App; 