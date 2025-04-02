import React from 'react';
import { Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useSelector } from 'react-redux';

const ProcessFlow = () => {
  const process = useSelector(state => state.process);
  const { steps, currentStep } = process;

  return (
    <Box>
      <Typography variant="h5">Process Flow</Typography>
      <Stepper activeStep={currentStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={2}>
        <Typography variant="body1">
          {steps[currentStep]?.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProcessFlow; 