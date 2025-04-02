import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';

const PhaseManagement = () => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = ['Planning', 'Development', 'Testing', 'Deployment', 'Maintenance'];
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const projects = [
    { id: 1, name: 'Product Redesign', phase: 1, dueDate: '2023-08-15', owner: 'Sarah Johnson' },
    { id: 2, name: 'Mobile App Development', phase: 2, dueDate: '2023-09-30', owner: 'Michael Chen' },
    { id: 3, name: 'Customer Portal', phase: 0, dueDate: '2023-11-10', owner: 'Jessica Williams' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Phase Management
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Current Project Phases</Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button 
            variant="contained" 
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Paper>
      
      <Typography variant="h6" gutterBottom>Project List</Typography>
      <Grid container spacing={2}>
        {projects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phase: {steps[project.phase]}
                </Typography>
                <Typography variant="body2">
                  Due: {project.dueDate}
                </Typography>
                <Typography variant="body2">
                  Owner: {project.owner}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PhaseManagement; 