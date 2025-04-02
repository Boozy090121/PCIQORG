import React from 'react';
import { Box, Typography, Grid, Rating } from '@mui/material';
import { useSelector } from 'react-redux';

const CompetencyMatrix = () => {
  const competencies = useSelector(state => state.competency.matrix);

  return (
    <Box>
      <Typography variant="h5">Competency Matrix</Typography>
      <Grid container spacing={2}>
        {competencies.map((competency, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box p={2} border={1} borderColor="divider" borderRadius={1}>
              <Typography variant="subtitle1">
                {competency.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {competency.description}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Typography component="legend">Current Level</Typography>
                <Rating
                  value={competency.level}
                  readOnly
                  max={5}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompetencyMatrix; 