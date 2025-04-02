import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { setCurrentFactory } from '../../../features/Organization/focusFactorySlice';
import { selectCurrentFactory, selectAllFactories } from '../../../features/Organization/focusFactorySlice';

/**
 * FactorySelector component for switching between different factories
 * @returns {JSX.Element} FactorySelector component
 */
export const FactorySelector = () => {
  const dispatch = useDispatch();
  const currentFactory = useSelector(selectCurrentFactory);
  const factories = useSelector(selectAllFactories);

  const handleFactoryChange = (event) => {
    dispatch(setCurrentFactory(event.target.value));
  };

  return (
    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="subtitle1">Factory:</Typography>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Select Factory</InputLabel>
        <Select
          value={currentFactory || ''}
          onChange={handleFactoryChange}
          label="Select Factory"
        >
          {factories.map(factory => (
            <MenuItem key={factory.id} value={factory.id}>
              {factory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}; 