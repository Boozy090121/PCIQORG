import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Alert
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { username, password } = formData;
    
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    // In a real app, you would validate against a server
    // For demo purposes, we'll simulate successful login
    onLogin({ username });
  };

  const handleDemoLogin = () => {
    onLogin({ username: 'Demo User' });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign in
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
          <Button
            fullWidth
            variant="outlined"
            onClick={handleDemoLogin}
          >
            Demo Login (No Credentials)
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login; 