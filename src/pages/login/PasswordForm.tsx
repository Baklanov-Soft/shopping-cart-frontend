import { Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthState } from 'context/auth-state';

interface PasswordFormValues {
  password: string;
}

interface PasswordFormProps {
  username: string;
  onSuccess: () => void;
}

function PasswordForm({ onSuccess, username }: PasswordFormProps) {
  const { setLoggedIn } = useAuthState();
  const form = useForm<PasswordFormValues>({
    initialValues: { password: '' },
    validate: {
      password: canNotBeEmpty
    }
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        login(username, values.password)
          .then(onSuccess)
          .then(() => setLoggedIn?.(true))
      )}
    >
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

export default PasswordForm;

function canNotBeEmpty(value: string) {
  return !value && 'Can not be empty';
}

function login(username: string, password: string) {
  return fetch('/api/v1/auth/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
}
