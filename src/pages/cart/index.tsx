import { CheckoutInfo } from '@components/CheckoutInfo';
import { Box, Checkbox, Flex, NumberInput, Table, Title } from '@mantine/core';
import Head from 'next/head';
import { Cart, CartItem } from 'types/cart';
import moneyToString from 'utils/money-to-string';
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
          <CartItems items={cart.items} />
        </Box>
        <Box sx={{ flexBasis: '33%' }}>
          <Box component="aside" sx={{ position: 'sticky', top: 0 }}>
            <CheckoutInfo quantity={2} totalPrice={cart.total} />
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
        {items.map(({ item, quantity }) => (
          <tr key={item.uuid}>
            <td>
              <Checkbox />
            </td>
            <td>{item.name}</td>
            <td>{moneyToString(item.price)}</td>
            <td>
              <NumberInput min={1} defaultValue={quantity} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
