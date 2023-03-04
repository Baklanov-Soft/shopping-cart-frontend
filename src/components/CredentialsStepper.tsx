import { Stepper } from '@mantine/core';
import { useState } from 'react';
import { BsFillPersonFill, BsKeyFill } from 'react-icons/bs';
import CheckLoginForm from './CheckLoginForm';
import PasswordForm from './PasswordForm';

interface CredentialsStepperProps {
  onSuccess?: () => void;
}

function CredentialsStepper({ onSuccess }: CredentialsStepperProps) {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <Stepper
      active={activeStep}
      onStepClick={setActiveStep}
      allowNextStepsSelect={false}
    >
      <Stepper.Step label="Username" icon={<BsFillPersonFill size="1.3rem" />}>
        <CheckLoginForm onSuccess={() => setActiveStep(1)} />
      </Stepper.Step>
      <Stepper.Step label="Password" icon={<BsKeyFill size="1.3rem" />}>
        <PasswordForm onSuccess={onSuccess} />
      </Stepper.Step>
    </Stepper>
  );
}

export default CredentialsStepper;
