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
  Header,
  MantineProvider,
  MediaQuery,
  TextInput,
  ThemeIcon
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { BsBoxSeam, BsCart3 } from 'react-icons/bs';

function HiddenMobile({ children }: React.PropsWithChildren) {
  return (
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      {children}
    </MediaQuery>
  );
}

function HiddenDesktop({ children }: React.PropsWithChildren) {
  return (
    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
      {children}
    </MediaQuery>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light'
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

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
          <Header height={60} px="1rem">
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

                  <ActionIcon component={Link} href={{ pathname: 'cart' }}>
                    <ThemeIcon>
                      <BsCart3 />
                    </ThemeIcon>
                  </ActionIcon>

                  <ActionIcon component={Link} href={{ pathname: 'orders' }}>
                    <ThemeIcon>
                      <BsBoxSeam />
                    </ThemeIcon>
                  </ActionIcon>

                  <Button variant="outline">Log in</Button>
                </Group>
              </HiddenMobile>

              <HiddenDesktop>
                <NavigationDrawer />
              </HiddenDesktop>
            </Group>
          </Header>

          <Container size="lg" px={8}>
            <Component {...pageProps} />
          </Container>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

//todo: decompose header to components
