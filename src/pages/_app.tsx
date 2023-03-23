import { Header } from '@components/Header';
import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider
} from '@mantine/core';
import { parse } from 'cookie';
import useColorSchemeToggle from 'hooks/use-color-scheme-toggle';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import NextApp from 'next/app';
import Head from 'next/head';

type AppOwnProps = {
  colorScheme: ColorScheme;
};

function App({
  Component,
  pageProps,
  colorScheme: cs
}: AppProps & AppOwnProps) {
  const [colorScheme, toggleColorScheme] = useColorSchemeToggle(cs);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <Header />
          <Container size="lg" px={8}>
            <Component {...pageProps} />
          </Container>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async function getInitialProps(
  appContext: AppContext
): Promise<AppOwnProps & AppInitialProps> {
  const appInitialProps = await NextApp.getInitialProps(appContext);

  //todo: use cookies from req
  if (appContext.ctx.req?.headers.cookie) {
    const cookie = parse(appContext.ctx.req.headers.cookie);
    const colorScheme =
      (cookie['COLOR_SCHEME'] as ColorScheme | undefined) ?? 'light';
    return { ...appInitialProps, colorScheme };
  }

  return { ...appInitialProps, colorScheme: 'light' };
};

export default App;
