import { CheckoutInfo } from '@components//cart/CheckoutInfo';
import { CartItems } from '@components/cart/CartItems';
import { EmptyCartNote } from '@components/cart/EmptyCartNote';
import { Box, Flex, Title } from '@mantine/core';
import { UpdateCartProvider, useUpdateCartForm } from 'context/update-cart';
import Head from 'next/head';
import { Cart } from 'types/cart';
import { withTokenSsr } from 'utils/withToken';

interface CartPageProps {
  cart: Cart;
  items: Record<string, number>[];
}

function CartPage({ cart, items }: CartPageProps) {
  const form = useUpdateCartForm({
    initialValues: { items },
    validate: {
      items: {
        item: (amount) => !amount && 'Can not be empty or zero.'
      }
    }
  });
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Title>Cart</Title>

      <UpdateCartProvider form={form}>
        <Flex gap={16}>
          <Box sx={{ flexBasis: '66%' }}>
            {cart.items.length > 0 ? (
              <CartItems items={cart.items} />
            ) : (
              <EmptyCartNote />
            )}
          </Box>
          <Box sx={{ flexBasis: '33%' }}>
            <Box component="aside" sx={{ position: 'sticky', top: 0 }}>
              <CheckoutInfo totalPrice={cart.total} />
            </Box>
          </Box>
        </Flex>
      </UpdateCartProvider>
    </>
  );
}

export default CartPage;

export const getServerSideProps = withTokenSsr(
  async function getServerSideProps({ req }) {
    const cart = await getCart(req.token);
    const items = cart.items.map((item) => ({
      [item.item.uuid]: item.quantity
    }));
    return { props: { cart, items } };
  }
);

function getCart(token: string): Promise<Cart> {
  return fetch('http://localhost:3000/api/v1/cart', {
    headers: {
      Authentication: `Bearer ${token}`
    }
  }).then((r) => r.json());
}
