import { Button, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { login } from './api';
import { useLoginContext } from './LoginProvider';

interface PasswordFormValues {
  password: string;
}

type PasswordFormProps = {
  onSuccess?: () => void;
};

function PasswordForm({ onSuccess }: PasswordFormProps) {
  const { state } = useLoginContext();
  const form = useForm<PasswordFormValues>({
    initialValues: { password: '' },
    validate: {
      password: canNotBeEmpty
    }
  });
  return (
    <form
      onSubmit={form.onSubmit((values) =>
        login(state.username, values.password).then(() => onSuccess?.())
      )}
    >
      <Title align="center" size="h2">
        Welcome, {state.username}!
      </Title>
      <PasswordInput
        label="Password"
        placeholder="Your password"
        withAsterisk
        {...form.getInputProps('password')}
        name="password"
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
