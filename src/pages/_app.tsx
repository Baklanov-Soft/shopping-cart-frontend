import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import cache from './cache';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'light' }}
        emotionCache={cache}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
