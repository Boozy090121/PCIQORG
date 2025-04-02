import React, { useState } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useSelector } from 'react-redux';

const FocusFactory = () => {
  const [selectedFactory, setSelectedFactory] = useState(null);
  
  // This would normally come from Redux, we're mocking it for now
  const factories = [
    { id: 1, name: 'Product Development', resources: 24, efficiency: 85 },
    { id: 2, name: 'Customer Support', resources: 18, efficiency: 92 },
    { id: 3, name: 'Marketing', resources: 12, efficiency: 78 }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Focus Factories
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>Factory List</Typography>
          <List>
            {factories.map(factory => (
              <React.Fragment key={factory.id}>
                <ListItem 
                  button 
                  selected={selectedFactory?.id === factory.id}
                  onClick={() => setSelectedFactory(factory)}
                >
                  <ListItemText 
                    primary={factory.name} 
                    secondary={`Resources: ${factory.resources}`} 
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Button variant="contained" sx={{ mt: 2 }}>
            Add New Factory
          </Button>
        </Paper>
        
        <Paper sx={{ flexGrow: 1, p: 2 }}>
          {selectedFactory ? (
            <>
              <Typography variant="h6" gutterBottom>
                {selectedFactory.name} Details
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                  <strong>Resources:</strong> {selectedFactory.resources}
                </Typography>
                <Typography variant="body1">
                  <strong>Efficiency:</strong> {selectedFactory.efficiency}%
                </Typography>
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button variant="outlined">Edit</Button>
                <Button variant="outlined" color="error">Delete</Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">
              Select a factory to view details
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default FocusFactory; 