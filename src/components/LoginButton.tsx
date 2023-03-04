import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LoginModal from './LoginModal';

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
