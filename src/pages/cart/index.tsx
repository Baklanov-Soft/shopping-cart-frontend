import { CartItemRow } from '@components/CartItem';
import { CheckoutInfo } from '@components/CheckoutInfo';
import { Anchor, Box, Flex, Table, Text, Title } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { Cart, CartItem } from 'types/cart';
import { withTokenSsr } from 'utils/withToken';

interface CartPageProps {
  cart: Cart;
}

function CartPage({ cart }: CartPageProps) {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <Title>Cart</Title>

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

function getCart(token: string): Promise<Cart> {
  return fetch('http://localhost:3000/api/v1/cart', {
    headers: {
      Authentication: `Bearer ${token}`
    }
  }).then((r) => r.json());
}

interface CartItemsProps {
  items: CartItem[];
}

function CartItems({ items }: CartItemsProps) {
  return (
    <Table verticalSpacing="sm">
      <tbody>
        {items.map((item) => (
          <CartItemRow item={item} key={item.item.uuid} />
        ))}
      </tbody>
    </Table>
  );
}

function EmptyCartNote() {
  return (
    <Text color="dimmed" align="center" size="lg">
      There is nothing to checkout. Go to{' '}
      <Anchor component={Link} href={{ pathname: '/catalog' }}>
        catalog
      </Anchor>{' '}
      and add some goods.
    </Text>
  );
}
