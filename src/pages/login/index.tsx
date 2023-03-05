import {
  Anchor,
  Container,
  Paper,
  Text,
  Title,
  Transition
} from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UrlObject } from 'url';
import CheckLoginForm from './CheckLoginForm';
import PasswordForm from './PasswordForm';

interface LoginPageProps {
  callback: UrlObject | string;
}

function LoginPage({ callback }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [form, setForm] = useState<'login' | 'password'>('login');
  const router = useRouter();
  return (
    <Container my={40} size="xs">
      <Title align="center">Welcome back!</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component={Link} href="/signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder radius="md" shadow="md" p={30} mt={30}>
        <Transition transition="slide-right" mounted={form === 'login'}>
          {(styles) => (
            <CheckLoginForm
              username={username}
              setUsername={setUsername}
              onSuccess={() => setForm('password')}
              styles={styles}
            />
          )}
        </Transition>
        <Transition transition="slide-left" mounted={form === 'password'}>
          {(styles) => (
            <PasswordForm
              username={username}
              onSuccess={() => router.push(callback)}
              styles={styles}
            />
          )}
        </Transition>
      </Paper>
    </Container>
  );
}

export default LoginPage;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { callback } = context.query;
  console.log(callback);

  return {
    props: { callback }
  };
}
