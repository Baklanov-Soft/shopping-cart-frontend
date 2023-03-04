import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { checkUsername } from './api';
import { userFound, userNotFound } from './login-reducer';
import { useLoginContext } from './LoginProvider';

type CheckLoginFormProps = {
  onSuccess?: () => void;
};

type CheckLoginFormValues = {
  username: string;
};

function CheckLoginForm({ onSuccess }: CheckLoginFormProps) {
  const { state, dispatch } = useLoginContext();
  const form = useForm<CheckLoginFormValues>({
    initialValues: { username: state.username },
    validate: {
      username: canNotBeEmpty
    }
  });
  return (
    <form
      onSubmit={form.onSubmit(({ username }) => {
        checkUsername(username).then((ok) => {
          if (ok) {
            dispatch(userFound(username));
            onSuccess?.();
          } else {
            dispatch(userNotFound());
            form.setFieldError('username', 'Your account not found');
          }
        });
      })}
    >
      <TextInput
        label="Username"
        placeholder="Your username"
        withAsterisk
        {...form.getInputProps('username')}
        data-autofocus
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
