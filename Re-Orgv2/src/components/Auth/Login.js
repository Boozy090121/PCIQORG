import React, { useState } from 'react';
import {
  Box,
<<<<<<< HEAD
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
          
=======
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setLoading, setError } from '../../features/Auth/authSlice';
import firebaseService from '../../services/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const result = await firebaseService.login(email, password);
      if (result.success) {
        dispatch(setCurrentUser(result.user));
      } else {
        dispatch(setError(result.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Re-Org Manager
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
          Sign in to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            disabled={loading}
          />

>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
          <Button
            type="submit"
            fullWidth
            variant="contained"
<<<<<<< HEAD
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
=======
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Box>
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
  );
};

export default Login; 