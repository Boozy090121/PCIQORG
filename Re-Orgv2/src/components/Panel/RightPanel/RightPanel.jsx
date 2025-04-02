import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, Typography, Divider, TextField, InputAdornment, Button,
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Paper, 
  Chip, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PersonIcon from '@mui/icons-material/Person';
import { selectPersonnelByFactory } from '../../../features/Organization/personnelSlice';
import { selectCurrentFactory } from '../../../features/Organization/focusFactorySlice';
import { PersonnelList } from './PersonnelList';
import { PersonnelCreator } from './PersonnelCreator';
import '../../../styles/shared/drag-drop-styles.css';

export const RightPanel = () => {
  const currentFactory = useSelector(selectCurrentFactory);
  const personnel = useSelector(state => selectPersonnelByFactory(state, currentFactory));
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingPersonnel, setIsCreatingPersonnel] = useState(false);

  const filteredPersonnel = personnel.filter(person => 
    person.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.currentRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddPersonnelClick = () => {
    setIsCreatingPersonnel(true);
  };

  const handlePersonnelCreatorClose = () => {
    setIsCreatingPersonnel(false);
  };

  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Personnel Management
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search personnel..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPersonnelClick}
        >
          Add Personnel
        </Button>
      </Box>

      <Paper sx={{ flex: 1, overflow: 'auto' }}>
        <List>
          {filteredPersonnel.map((person) => (
            <ListItem
              key={person.id}
              draggable
              sx={{
                cursor: 'grab',
                '&:active': { cursor: 'grabbing' }
              }}
            >
              <DragIndicatorIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={person.name}
                secondary={
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={person.currentRole}
                      size="small"
                      variant="outlined"
                    />
                    {person.skills?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                }
              />
              <IconButton size="small">
                <EditIcon />
              </IconButton>
              <IconButton size="small">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      <PersonnelCreator
        open={isCreatingPersonnel}
        onClose={handlePersonnelCreatorClose}
      />
    </Box>
  );
}; 