import ColorSchemeToggle from '@components/ColorSchemeToggle';
import {
  Burger,
  Button,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsBoxSeam, BsCart3 } from 'react-icons/bs';
import { UrlObject } from 'url';

type NavigationDrawerProps = {
  className?: string;
};

export function NavigationDrawer({ className }: NavigationDrawerProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();

  return (
    <>
      <Burger opened={opened} onClick={toggle} className={className} />
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Flex align="center">
            <Text component="span" mr="0.5rem">
              Navigation
            </Text>
            <ColorSchemeToggle />
          </Flex>
        }
        padding="md"
        position="right"
        overlayProps={{ opacity: 0.55, blur: 3 }}
      >
        <ScrollArea mx="-md" sx={{ height: 'calc(100vh - 60px)' }}>
          <Divider my="sm" />

          <DrawerButton
            title="Cart"
            icon={<BsCart3 />}
            href={{ pathname: 'cart' }}
          />
          <DrawerButton
            title="Orders"
            icon={<BsBoxSeam />}
            href={{ pathname: 'orders' }}
          />

          <Divider my="sm" />

          <Group position="center" grow pb="lg" px="md">
            <Button
              component={Link}
              href={{
                pathname: 'login',
                query: { callback: router.asPath }
              }}
            >
              Log in
            </Button>
            <Button
              variant="outline"
              component={Link}
              href={{
                pathname: 'signup',
                query: { callback: router.asPath }
              }}
            >
              Sign up
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
}

type DrawerButtonProps = {
  title: string;
  icon: React.ReactNode;
  href: string | UrlObject;
};

function DrawerButton({ title, icon, href }: DrawerButtonProps) {
  return (
    <UnstyledButton
      component={Link}
      href={href}
      px="sm"
      py="xs"
      sx={(theme) => ({
        display: 'block',

        ...theme.fn.hover({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[1]
        }),

        '&:active': theme.activeStyles
      })}
    >
      <Group noWrap align="start" sx={{ alignItems: 'center' }}>
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
