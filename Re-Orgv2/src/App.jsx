import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Organization Manager
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          The application is working! Click the button below to view details.
        </Typography>
        <Button variant="contained">Show Organization Chart</Button>
      </Box>
    </Container>
  );
}

export default App; 