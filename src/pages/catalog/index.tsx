import {
  Anchor,
  Box,
  Button,
  Card,
  SimpleGrid,
  Text,
  Title
} from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { fetchItems } from './api';
import { ListItem, Money } from './types';

type CatalogPageProps = {
  items?: ListItem[];
};

function CatalogPage({ items }: CatalogPageProps) {
  return (
    <>
      <Head>
        <title>Catalog</title>
      </Head>
      <Title>Catalog page</Title>
      {items && (
        <SimpleGrid
          breakpoints={[
            { minWidth: 'xs', cols: 2 },
            { minWidth: 'sm', cols: 3 },
            { minWidth: 'md', cols: 4 }
          ]}
        >
          {items.map((item) => (
            <ItemCard item={item} key={item.uuid} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
interface ItemCardProps {
  item: ListItem;
}
function ItemCard({ item: { name, price, uuid } }: ItemCardProps) {
  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Anchor component={Link} href={{ pathname: uuid }} size="md">
        {name}
      </Anchor>
      <Box
        mt="md"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Money>{price}</Money>
        <Button size="xs">Add to cart</Button>
      </Box>
    </Card>
  );
}
interface MoneyProps {
  children: Money;
}
function Money({ children: { currency, value } }: MoneyProps) {
  return (
    <Text weight="bold" size="xl" component="span">
      {currency.concat(value.toString())}
    </Text>
  );
}

export default CatalogPage;

export async function getServerSideProps() {
  const items = await fetchItems();
  return {
    props: { items }
  };
}
