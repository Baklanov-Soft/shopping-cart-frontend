import {
  ActionIcon,
  Box,
  Button,
  Group,
  Header as MantineHeader,
  MediaQuery,
  TextInput,
  ThemeIcon
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsBoxSeam, BsCart3 } from 'react-icons/bs';
import ColorSchemeToggle from './ColorSchemeToggle';
import { Logo } from './Logo';
import { NavigationDrawer } from './NavigationDrawer';

export function Header() {
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

export function HiddenMobile({ children }: React.PropsWithChildren) {
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
