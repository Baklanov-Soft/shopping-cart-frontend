import { ActionIcon, Button, Group } from '@mantine/core';
import { useAuthState } from 'context/auth-state';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

export function LogoutButton() {
  const { setLoggedIn } = useAuthState();
  const [confirmRequired, setConfirmRequired] = useState(false);
  function confirmNotRequired() {
    return setConfirmRequired(false);
  }
  if (!confirmRequired) {
    return <Button onClick={() => setConfirmRequired(true)}>Logout</Button>;
  }
  return (
    <Group noWrap spacing={0}>
      <Button
        uppercase
        color="red"
        sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onClick={() =>
          logout()
            .then(confirmNotRequired)
            .then(() => setLoggedIn?.(false))
        }
      >
        Confirm
      </Button>
      <ActionIcon
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          border: 0,
          borderLeftWidth: 1,
          borderLeftStyle: 'solid',
          borderLeftColor: 'white'
        }}
        variant="filled"
        color="red"
        size={36}
        onClick={confirmNotRequired}
      >
        <IoClose color="white" size="1rem" />
      </ActionIcon>
    </Group>
  );
}

function logout() {
  return fetch('/api/v1/auth/logout', { method: 'POST' });
}
