import { Box, Checkbox, Flex, NumberInput, Sx } from '@mantine/core';
import { useDebouncedState, useDidUpdate } from '@mantine/hooks';
import { getCartClient } from '@pages/cart';
import { toggle, useSelection } from 'context/selection';
import { useUpdateCartContext } from 'context/update-cart';
import useSWR from 'swr';
import { Cart, CartItem } from 'types/cart';
import { moneyToString } from 'utils/money-to-string';
import { CartItemActions } from './CartItemActions';

interface CartItemRowProps {
  item: CartItem;
  index: number;
  sx?: Sx;
}

export function CartItemRow({ item, index, sx }: CartItemRowProps) {
  const { state, dispatch } = useSelection();

  return (
    <Flex sx={sx}>
      <Checkbox
        checked={state.includes(item.item.uuid)}
        onChange={() => dispatch(toggle(item.item.uuid))}
        mr={12}
      />
      <Flex
        direction="column"
        justify="space-between"
        sx={{ flexBasis: '100%' }}
      >
        <span>{item.item.name}</span>
        <CartItemActions uuid={item.item.uuid} />
      </Flex>
      <Box>
        <span>{moneyToString(item.item.price)}</span>
        <ItemAmountInput index={index} uuid={item.item.uuid} />
      </Box>
    </Flex>
  );
}

interface ItemAmountInputProps {
  index: number;
  uuid: string;
}

function ItemAmountInput({ index, uuid }: ItemAmountInputProps) {
  const { data: cart } = useSWR('/api/v1/cart', getCartClient, {
    revalidateOnMount: false
  });

  const form = useUpdateCartContext();
  const { value, onChange, ...inputProps } = form.getInputProps(
    `items.${index}.${uuid}`
  );
  const [quantity, setQuantity] = useDebouncedState<number>(value, 600);

  useDidUpdate(() => {
    if (cart) updateCart(cart, uuid, quantity);
  }, [quantity]);

  return (
    <NumberInput
      min={1}
      placeholder="quantity"
      defaultValue={quantity}
      onChange={(q) => {
        onChange(q);
        if (q) setQuantity(q);
      }}
      {...inputProps}
    />
  );
}

function updateCart(cart: Cart, uuid: string, quantity: number) {
  const items = {
    ...cart.items.reduce(
      (acc, item) => ({ ...acc, [item.item.uuid]: item.quantity }),
      {}
    ),
    [uuid]: quantity
  };

  return fetch('/api/v1/cart', {
    method: 'PUT',
    body: JSON.stringify({ items })
  });
}
