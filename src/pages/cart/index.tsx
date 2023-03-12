import { CartItemRow } from '@components/CartItem';
import { CheckoutInfo } from '@components/CheckoutInfo';
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Flex,
  Text,
  Title
} from '@mantine/core';
import { SelectionProvider, toggleAll, useSelection } from 'context/selection';
import { UpdateCartProvider, useUpdateCartForm } from 'context/update-cart';
import Head from 'next/head';
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';
import { Cart, CartItem } from 'types/cart';
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

interface CartItemsProps {
  items: CartItem[];
}

function CartItems({ items }: CartItemsProps) {
  return (
    <SelectionProvider>
      <Box mt={8}>
        <TopActions items={items} />
        <Box mt={16}>
          {items.map((item, index) => (
            <CartItemRow
              sx={(theme) => ({
                ':not(:last-child)': {
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.gray[7]
                      : theme.colors.gray[3],
                  marginBottom: theme.spacing.sm,
                  paddingBottom: theme.spacing.sm
                }
              })}
              key={item.item.uuid}
              item={item}
              index={index}
            />
          ))}
        </Box>
      </Box>
    </SelectionProvider>
  );
}

interface TopActionsProps {
  items: CartItem[];
}

function TopActions({ items }: TopActionsProps) {
  const { state, dispatch } = useSelection();

  return (
    <Flex align="center" gap={8}>
      <Checkbox
        checked={state.length === items.length}
        indeterminate={state.length > 0 && state.length !== items.length}
        onChange={() => dispatch(toggleAll(items))}
        label="Select all"
      />
      <Button
        variant="subtle"
        compact
        color="red"
        leftIcon={<IoMdClose size={18} />}
      >
        Delete selected
      </Button>
    </Flex>
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
