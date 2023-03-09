import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface CheckLoginFormProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  onSuccess: () => void;
}

interface CheckLoginFormValues {
  username: string;
}

function CheckLoginForm({
  username,
  setUsername,
  onSuccess
}: CheckLoginFormProps) {
  const form = useForm<CheckLoginFormValues>({
    initialValues: { username },
    validate: {
      username: canNotBeEmpty
    }
  });
  return (
    <form
      onSubmit={form.onSubmit(({ username }) =>
        exists(username).then((ok) => {
          if (ok) {
            setUsername(username);
            onSuccess();
          } else {
            form.setFieldError('username', 'Your account not found');
          }
        })
      )}
    >
      <TextInput
        label="Username"
        placeholder="Your username"
        withAsterisk
        {...form.getInputProps('username')}
      />
      <Button type="submit" fullWidth mt="md" uppercase>
        Next
      </Button>
    </form>
  );
}

export default CheckLoginForm;

function canNotBeEmpty(value: string) {
  return !value && 'Can not be empty';
}
function exists(username: string) {
  const encodedUsername = encodeURIComponent(username);
  return fetch(`/api/auth/users/check?username=${encodedUsername}`).then(
    (r) => r.status == 200
  );
}
