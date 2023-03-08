import { Anchor, Container, Paper, Text, Title } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CheckLoginForm from './CheckLoginForm';
import PasswordForm from './PasswordForm';

interface LoginPageProps {
  callback: string;
}

function LoginPage({ callback }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [step, setStep] = useState<'login' | 'password'>('login');
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Container my={40} size="xs">
        <Title align="center">Welcome back!</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor
            size="sm"
            component={Link}
            href={{ pathname: 'signup', query: { callback } }}
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder radius="md" shadow="md" p={30} mt={30}>
          {step === 'login' && (
            <CheckLoginForm
              username={username}
              setUsername={setUsername}
              onSuccess={() => setStep('password')}
            />
          )}
          {step === 'password' && (
            <PasswordForm
              username={username}
              onSuccess={() => router.push(callback)}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

export default LoginPage;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { callback } = context.query;

  return {
    props: { callback }
  };
}
