import ColorSchemeToggle from '@components/ColorSchemeToggle';
import Logo from '@components/Logo';
import {
  ActionIcon,
  Box,
  Burger,
  Button,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  Header,
  MantineProvider,
  MediaQuery,
  ScrollArea,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton
} from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
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

  const [opened, { toggle, close }] = useDisclosure(false);

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

                  <Button>Log in</Button>
                </Group>
              </HiddenMobile>

              <HiddenDesktop>
                <Burger opened={opened} onClick={toggle} />
              </HiddenDesktop>
            </Group>
          </Header>

          <Container size="lg" px={8}>
            <Component {...pageProps} />
          </Container>

          <Drawer
            opened={opened}
            onClose={close}
            title={
              <Flex align="center" gap="0.5rem">
                <Text component="span">Navigation</Text>
                <ColorSchemeToggle />
              </Flex>
            }
            padding="md"
            position="right"
            overlayOpacity={0.55}
            overlayBlur={3}
          >
            <ScrollArea mx="-md" sx={{ height: 'calc(100vh - 60px)' }}>
              <Divider my="sm" />
              <DrawerButton title="Cart" icon={<BsCart3 />} pathname="cart" />
              <DrawerButton
                title="Orders"
                icon={<BsBoxSeam />}
                pathname="orders"
              />
            </ScrollArea>
          </Drawer>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

type DrawerButtonProps = {
  title: React.ReactNode;
  icon: React.ReactNode;
  pathname: string;
};

function DrawerButton({ title, icon, pathname }: DrawerButtonProps) {
  return (
    <UnstyledButton
      component={Link}
      href={{ pathname }}
      px="sm"
      py="xs"
      sx={(theme) => ({
        display: 'block',
        width: '100%',

        ...theme.fn.hover({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[1]
        }),

        '&:active': theme.activeStyles
      })}
    >
      <Group noWrap align="flex-start" sx={{ alignItems: 'center' }}>
        <ThemeIcon variant="outline" size="lg" radius="md">
          {icon}
        </ThemeIcon>
        <Text size="sm" component="span">
          {title}
        </Text>
      </Group>
    </UnstyledButton>
  );
}
//todo: add login button to drawer
//todo: decompose header to components
