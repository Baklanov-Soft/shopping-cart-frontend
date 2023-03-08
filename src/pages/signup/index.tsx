import { Anchor, Container, Paper, Text, Title } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CheckLoginForm from './CheckLoginForm';
import PasswordForm from './PasswordForm';

interface SignupPageProps {
  callback: string;
}

function SignupPage({ callback }: SignupPageProps) {
  const [username, setUsername] = useState('');
  const [form, setForm] = useState<'login' | 'password'>('login');
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <Container my={40} size="xs">
        <Title align="center">Create account</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor
            size="sm"
            component={Link}
            href={{ pathname: 'login', query: { callback } }}
          >
            Login
          </Anchor>
        </Text>

        <Paper withBorder radius="md" shadow="md" p={30} mt={30}>
          {form === 'login' && (
            <CheckLoginForm
              username={username}
              setUsername={setUsername}
              onSuccess={() => setForm('password')}
            />
          )}
          {form === 'password' && (
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

export default SignupPage;

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { callback } = context.query;

  return {
    props: { callback }
  };
}
