import { Header } from '@components/Header';
import {
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider
} from '@mantine/core';
import { AuthStateProvider } from 'context/auth-state';
import useColorSchemeToggle from 'hooks/use-color-scheme-toggle';
import { IncomingMessage } from 'http';
import type { NextPageContext } from 'next';
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import Head from 'next/head';

type AppOwnProps = {
  colorScheme: ColorScheme;
  loggedIn: boolean;
};

function App({
  Component,
  pageProps,
  colorScheme: cs,
  loggedIn
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
          <AuthStateProvider loggedIn={loggedIn}>
            <Header />
            <Container size="lg" px={8}>
              <Component {...pageProps} />
            </Container>
          </AuthStateProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = async function getInitialProps(
  appContext: AppContext & {
    ctx: NextPageContext & { req: IncomingMessage & { cookies: AppCookies } };
  }
) {
  const appInitialProps = await NextApp.getInitialProps(appContext);

  if (appContext.ctx.req?.cookies.COLOR_SCHEME) {
    const colorScheme = appContext.ctx.req?.cookies.COLOR_SCHEME ?? 'light';
    Object.assign(appInitialProps, { colorScheme });
  }
  if (appContext.ctx.req?.cookies.ACCESS_TOKEN) {
    const loggedIn = Boolean(appContext.ctx.req?.cookies.ACCESS_TOKEN);
    Object.assign(appInitialProps, { loggedIn });
  }

  return appInitialProps;
};

export default App;

interface AppCookies {
  COLOR_SCHEME?: ColorScheme;
  ACCESS_TOKEN?: string;
}
