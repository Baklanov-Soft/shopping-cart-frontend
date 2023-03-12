import { ActionIcon, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function LogoutButton() {
  const [confirmRequired, setConfirmRequired] = useState(false);
  function confirmNotRequired() {
    return setConfirmRequired(false);
  }
  if (!confirmRequired) {
    return (
      <Button onClick={() => setConfirmRequired(true)} uppercase>
        Logout
      </Button>
    );
  }
  return (
    <Group noWrap spacing={0}>
      <Button
        uppercase
        color="red"
        sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        onClick={() => logout().then(confirmNotRequired)}
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

export default LogoutButton;

function logout() {
  return fetch('/api/logout', { method: 'post' });
}
