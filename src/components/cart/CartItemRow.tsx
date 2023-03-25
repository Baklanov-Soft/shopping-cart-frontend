import { Box, Button, Checkbox, Flex, NumberInput, Sx } from '@mantine/core';
import { toggle, useSelection } from 'context/selection';
import { CartItem } from 'types/cart';
import { moneyToString } from 'utils/money-to-string';

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
        <CartItemActions />
      </Flex>
      <Box>
        <span>{moneyToString(item.item.price)}</span>
        <NumberInput min={1} placeholder="quantity" />
      </Box>
    </Flex>
  );
}

function CartItemActions() {
  return (
    <Box>
      <Button color="red" compact variant="subtle">
        Delete
      </Button>
    </Box>
  );
}

function updateQuantity(uuid: string, quantity: number) {
  return fetch('/api/v1/cart', {
    method: 'put',
    body: JSON.stringify({ uuid, quantity })
  });
}
