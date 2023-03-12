import { ItemCard } from '@components/catalog/ItemCard';
import { SimpleGrid, Title } from '@mantine/core';
import Head from 'next/head';
import { ListItem } from 'types/catalog';

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

export default CatalogPage;

export async function getServerSideProps() {
  const items = await fetchItems();
  return {
    props: { items }
  };
}

function fetchItems(): Promise<ListItem[]> {
  return fetch('http://localhost:3000/api/v1/items').then((res) => res.json());
}
