import { Anchor, Button, Card, Flex, Text, Title } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { fetchItems } from './api';
import { GuitarItem } from './types';

type CatalogPageProps = { items: GuitarItem[] };

function CatalogPage({ items }: CatalogPageProps) {
  return (
    <>
      <Head>
        <title>Catalog</title>
      </Head>
      <Title>Catalog page</Title>
      {items && (
        <Flex wrap="wrap" gap="md">
          {items.map(renderGuitarItem)}
        </Flex>
      )}
    </>
  );
}

function renderGuitarItem(item: GuitarItem) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder key={item.uuid}>
      <Anchor component={Link} href={{ pathname: item.uuid }}>
        <Text size="lg">{item.name}</Text>
      </Anchor>
      <Button fullWidth mt="md">
        Add to cart
      </Button>
    </Card>
  );
}

export default CatalogPage;

export async function getServerSideProps() {
  const items = await fetchItems();
  return {
    props: { items }
  };
}
