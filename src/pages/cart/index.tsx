import { CartItems } from '@components/cart/CartItems';
import { CheckoutInfo } from '@components/cart/CheckoutInfo';
import { EmptyCartNote } from '@components/cart/EmptyCartNote';
import { Box, Flex, Title } from '@mantine/core';
import { UpdateCartProvider, useUpdateCartForm } from 'context/update-cart';
import Head from 'next/head';
import useSWR from 'swr';
import { Cart } from 'types/cart';
import { withTokenSsr } from 'utils/with-token';

interface CartPageProps {
  cart: Cart;
}

function validator(amount: number) {
  if (typeof amount === 'string' && amount === '') {
    return 'Can not be empty.';
  }
  return amount === 0 ? 'Can not be zero.' : null;
}

function CartPage({ cart }: CartPageProps) {
  const { data } = useSWR('/api/v1/cart', getCartClient, {
    fallbackData: cart,
    revalidateOnMount: false
  });
  const items = data.items.map((item) => ({
    [item.item.uuid]: item.quantity
  }));
  const form = useUpdateCartForm({
    initialValues: { items },
    validate: {
      items: {
        ...items
          .flatMap(Object.keys)
          .reduce((a, v) => ({ ...a, [v]: validator }), {})
      }
    }
  });

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Title>Cart</Title>

      <form
        onSubmit={form.onSubmit((values) => console.log('checkout', values))}
      >
        <UpdateCartProvider form={form}>
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
        </UpdateCartProvider>
      </form>
    </>
  );
}

export default CartPage;

export const getServerSideProps = withTokenSsr(
  async function getServerSideProps({ req }) {
    const cart = await getCart(req.token);
    return { props: { cart } };
  }
);

async function getCart(token?: string): Promise<Cart> {
  return fetch(process.env.API_URL + '/api/v1/cart', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }).then((r) => r.json());
}

export async function getCartClient(key: string): Promise<Cart> {
  return fetch(key, {
    headers: {
      Accept: 'application/json'
    }
  }).then((r) => r.json());
}
