import { CheckoutInfo } from '@components//cart/CheckoutInfo';
import { CartItems } from '@components/cart/CartItems';
import { EmptyCartNote } from '@components/cart/EmptyCartNote';
import { Box, Flex, Title } from '@mantine/core';
import Head from 'next/head';
import useSWR from 'swr';
import { Cart } from 'types/cart';
import { withTokenSsr } from 'utils/with-token';

interface CartPageProps {
  cart: Cart;
}

function CartPage({ cart }: CartPageProps) {
  const { data } = useSWR('/api/v1/cart', fetchCart, {
    fallbackData: cart,
    revalidateOnMount: false
  });
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Title>Cart</Title>

      <Flex gap={16}>
        <Box sx={{ flexBasis: '66%' }}>
          {data.items.length > 0 ? (
            <CartItems items={data.items} />
          ) : (
            <EmptyCartNote />
          )}
        </Box>
        <Box sx={{ flexBasis: '33%' }}>
          <Box component="aside" sx={{ position: 'sticky', top: 0 }}>
            <CheckoutInfo totalPrice={data.total} />
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default CartPage;

export const getServerSideProps = withTokenSsr(
  async function getServerSideProps({ req }) {
    const res = await fetch(process.env.API_URL + '/api/v1/cart', {
      headers: {
        Authorization: `Bearer ${req.token}`,
        Accept: 'application/json'
      }
    });
    const cart = await res.json();
    return { props: { cart } };
  }
);

function fetchCart(key: string): Promise<Cart> {
  return fetch(key, {
    headers: {
      Accept: 'application/json'
    }
  }).then((r) => r.json());
}
