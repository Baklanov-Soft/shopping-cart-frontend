import { Button, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { login } from './api';

interface PasswordFormValues {
  password: string;
}

interface PasswordFormProps {
  username: string;
  onSuccess: () => void;
  styles?: React.CSSProperties;
}

function PasswordForm({ onSuccess, username, styles }: PasswordFormProps) {
  const form = useForm<PasswordFormValues>({
    initialValues: { password: '' },
    validate: {
      password: canNotBeEmpty
    }
  });
  return (
    <form
      style={styles}
      onSubmit={form.onSubmit((values) =>
        login(username, values.password).then(onSuccess)
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
