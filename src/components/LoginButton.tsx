import { Button, Modal, PasswordInput, Stepper, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { BsFillPersonFill, BsKeyFill } from 'react-icons/bs';
import { CheckLoginForm } from './CheckLoginForm';
import { LoginProvider, useLoginContext } from './LoginProvider';

function LoginButton() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Button variant="outline" uppercase onClick={open}>
        Log in
      </Button>
      <LoginModal opened={opened} onClose={close} />
    </>
  );
}

export default LoginButton;

type LoginSigninModalProps = {
  opened: boolean;
  onClose: () => void;
};

function LoginModal({ opened, onClose }: LoginSigninModalProps) {
  const isMobile = useMediaQuery('(max-width: 36em)', true, {
    getInitialValueInEffect: false
  });
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      fullScreen={isMobile}
      title="Authentication"
    >
      <LoginProvider>
        <CredentialsStepper />
      </LoginProvider>
    </Modal>
  );
}

function CredentialsStepper() {
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
        <PasswordForm />
      </Stepper.Step>
    </Stepper>
  );
}

interface PasswordFormValues {
  password: string;
}

function PasswordForm() {
  const { state } = useLoginContext();
  const form = useForm<PasswordFormValues>({
    initialValues: { password: '' }
  });
  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <Title align="center" size="h2">
        Welcome, {state.username}!
      </Title>
      <PasswordInput
        label="Password"
        placeholder="Your password"
        withAsterisk
        {...form.getInputProps('password')}
      />
      <Button type="submit" fullWidth mt="md" uppercase>
        Next
      </Button>
    </form>
  );
}

function canNotBeEmpty(value: string) {
  return !value && 'Can not be empty';
}
