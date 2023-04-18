import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

const steps = [
  'Produto saiu!',
  'A caminho',
  'Entregue',
];
export default function Carga() {

    const [passo, setPasso] = React.useState(-1)

    console.log(passo)
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={passo} alternativeLabel sx={{paddingTop:15}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Button onClick={() => 
        passo === 2 ? setPasso(0) : setPasso(Number(passo) + 1)
    } >Próximo passo</Button>
    </Box>
  );
}