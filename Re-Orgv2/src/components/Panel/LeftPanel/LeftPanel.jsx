import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { RoleList } from './RoleList';
import { RoleCreator } from './RoleCreator';

export const LeftPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingRole, setIsCreatingRole] = useState(false);

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Roles
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreatingRole(true)}
        >
          Add Role
        </Button>
      </Box>
      <RoleList searchTerm={searchTerm} />
      {isCreatingRole && (
        <RoleCreator
          open={isCreatingRole}
          onClose={() => setIsCreatingRole(false)}
        />
      )}
    </Box>
  );
}; 