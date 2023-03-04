import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CredentialsStepper from './CredentialsStepper';
import { LoginProvider } from './LoginProvider';

type LoginModalProps = {
  opened: boolean;
  onClose: () => void;
};

function LoginModal({ opened, onClose }: LoginModalProps) {
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
        <CredentialsStepper onSuccess={onClose} />
      </LoginProvider>
    </Modal>
  );
}

export default LoginModal;
