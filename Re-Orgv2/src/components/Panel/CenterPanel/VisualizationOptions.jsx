import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const VisualizationOptions = ({ options, onOptionChange }) => {
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    onOptionChange({
      ...options,
      [name]: name === 'showLabels' || name === 'showConnections' ? checked : value
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Layout</InputLabel>
        <Select
          name="layout"
          value={options.layout}
          onChange={handleChange}
          label="Layout"
        >
          <MenuItem value="hierarchical">Hierarchical</MenuItem>
          <MenuItem value="force">Force-Directed</MenuItem>
          <MenuItem value="circular">Circular</MenuItem>
        </Select>
      </FormControl>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={options.showLabels}
              onChange={handleChange}
              name="showLabels"
            />
          }
          label="Show Labels"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={options.showConnections}
              onChange={handleChange}
              name="showConnections"
            />
          }
          label="Show Connections"
        />
      </FormGroup>
    </Box>
  );
};

VisualizationOptions.propTypes = {
  options: PropTypes.shape({
    layout: PropTypes.string.isRequired,
    showLabels: PropTypes.bool.isRequired,
    showConnections: PropTypes.bool.isRequired
  }).isRequired,
  onOptionChange: PropTypes.func.isRequired
};

export default VisualizationOptions; 