import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 3
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color="error">
          Something went wrong
        </Typography>
        <Typography variant="body1" paragraph>
          {error.message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={resetErrorBoundary}
        >
          Try again
        </Button>
      </Paper>
    </Box>
  );
};

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
} 