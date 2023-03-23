import { ItemCard } from '@components/catalog/ItemCard';
import { SimpleGrid, Title } from '@mantine/core';
import Head from 'next/head';
import useSWR from 'swr';
import { ListItem } from 'types/catalog';

interface CatalogPageProps {
  items?: ListItem[];
}

function CatalogPage({ items }: CatalogPageProps) {
  const { data } = useSWR('/api/v1/items', fetchItems, {
    fallbackData: items,
    revalidateOnMount: false
  });

  return (
    <>
      <Head>
        <title>Catalog</title>
      </Head>

      <Title>Catalog page</Title>

      {data && (
        <SimpleGrid
          breakpoints={[
            { minWidth: 'xs', cols: 2 },
            { minWidth: 'sm', cols: 3 },
            { minWidth: 'md', cols: 4 }
          ]}
        >
          {data.map((item) => (
            <ItemCard item={item} key={item.uuid} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}

export default CatalogPage;

export async function getServerSideProps() {
  const items = await fetchItems('/api/v1/items');
  return {
    props: { items }
  };
}

function fetchItems(key: string): Promise<ListItem[]> {
  return fetch(process.env.NEXT_PUBLIC_API_URL + key).then((res) => res.json());
}
