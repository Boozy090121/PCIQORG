import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { selectAllFactories, selectFactoryById } from '../../features/Organization/factorySlice';
import { selectCurrentFactory, setCurrentFactory } from '../../features/Organization/focusFactorySlice';

/**
 * FactorySelector component for selecting and managing the current factory
 * @returns {JSX.Element} FactorySelector component
 */
export const FactorySelector = () => {
  const dispatch = useDispatch();
  const factories = useSelector(selectAllFactories);
  const currentFactory = useSelector(selectCurrentFactory);
  const currentFactoryDetails = useSelector(state => 
    currentFactory ? selectFactoryById(state, currentFactory) : null
  );

  const handleFactoryChange = (event) => {
    dispatch(setCurrentFactory(event.target.value));
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Select Factory</InputLabel>
        <Select
          value={currentFactory || ''}
          onChange={handleFactoryChange}
          label="Select Factory"
        >
          {factories.map((factory) => (
            <MenuItem key={factory.id} value={factory.id}>
              {factory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {currentFactoryDetails && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={currentFactoryDetails.location}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${currentFactoryDetails.departments?.length || 0} Departments`}
            size="small"
            color="secondary"
            variant="outlined"
          />
          <Tooltip title="Working Hours">
            <Chip
              label={`${currentFactoryDetails.workingHours?.start || '--:--'} - ${currentFactoryDetails.workingHours?.end || '--:--'}`}
              size="small"
              color="info"
              variant="outlined"
            />
          </Tooltip>
        </Box>
      )}
    </Box>
  );
}; 