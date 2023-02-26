import {
  ActionIcon,
  Anchor,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  MantineProvider,
  Text,
  TextInput,
  ThemeIcon
} from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { BsBoxSeam, BsCart3 } from 'react-icons/bs';
import cache from './cache';

const useStyles = createStyles({
  searchForm: {
    display: 'flex'
  }
});

export default function App({ Component, pageProps }: AppProps) {
  const { classes } = useStyles();

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
        <Header height={60} px={8}>
          <Group position="apart" sx={{ height: '100%' }}>
            <Anchor component={Link} href={{ pathname: '/' }}>
              <Text fz="lg" fw="bolder" tt="uppercase" component="span">
                Shopping cart
              </Text>
            </Anchor>

            <form method="get" action="/" className={classes.searchForm}>
              <Group>
                <TextInput name="q" />
                <Button type="submit">Search</Button>
              </Group>
            </form>

            <Group>
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
          </Group>
        </Header>

        <Container size="lg" px={8}>
          <Component {...pageProps} />
        </Container>
      </MantineProvider>
    </>
  );
}
//todo: decompose header to components
