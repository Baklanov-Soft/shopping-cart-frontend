import ColorSchemeToggle from '@components/ColorSchemeToggle';
import Logo from '@components/Logo';
import NavigationDrawer from '@components/NavigationDrawer';
import {
  ActionIcon,
  Box,
  Button,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Group,
  Header as MantineHeader,
  MantineProvider,
  MediaQuery,
  TextInput,
  ThemeIcon
} from '@mantine/core';
import { parse } from 'cookie';
import useColorSchemeToggle from 'hooks/use-color-scheme-toggle';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import NextApp from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsBoxSeam, BsCart3 } from 'react-icons/bs';

function HiddenMobile({ children }: React.PropsWithChildren) {
  return (
    <MediaQuery smallerThan={840} styles={{ display: 'none' }}>
      {children}
    </MediaQuery>
  );
}

function HiddenDesktop({ children }: React.PropsWithChildren) {
  return (
    <MediaQuery largerThan={840} styles={{ display: 'none' }}>
      {children}
    </MediaQuery>
  );
}

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

App.getInitialProps = async (
  appContext: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await NextApp.getInitialProps(appContext);

  if (appContext.ctx.req?.headers.cookie) {
    const cookie = parse(appContext.ctx.req.headers.cookie);
    const colorScheme =
      (cookie['COLOR_SCHEME'] as ColorScheme | undefined) ?? 'light';
    return { ...ctx, colorScheme };
  }

  return { ...ctx, colorScheme: 'light' };
};

export default App;

function Header() {
  const router = useRouter();
  return (
    <MantineHeader height={60} px="1rem">
      <Group position="apart" sx={{ height: '100%' }} spacing={0}>
        <Logo />

        <HiddenMobile>
          <Box
            component="form"
            method="get"
            action="/"
            sx={{ flexGrow: 1, display: 'flex', columnGap: '1rem' }}
            px="1rem"
          >
            <TextInput name="q" sx={{ width: '100%' }} />
            <Button type="submit">Search</Button>
          </Box>
        </HiddenMobile>

        <HiddenMobile>
          <Group>
            <ColorSchemeToggle />

            <ActionIcon component={Link} href={{ pathname: '/cart' }}>
              <ThemeIcon>
                <BsCart3 />
              </ThemeIcon>
            </ActionIcon>

            <ActionIcon component={Link} href={{ pathname: '/orders' }}>
              <ThemeIcon>
                <BsBoxSeam />
              </ThemeIcon>
            </ActionIcon>

            <Button
              component={Link}
              href={{
                pathname: '/login',
                query: { callback: router.asPath }
              }}
            >
              Log in
            </Button>
            <Button
              variant="outline"
              component={Link}
              href={{
                pathname: '/signup',
                query: { callback: router.asPath }
              }}
            >
              Sign up
            </Button>
          </Group>
        </HiddenMobile>

        <HiddenDesktop>
          <NavigationDrawer />
        </HiddenDesktop>
      </Group>
    </MantineHeader>
  );
}
