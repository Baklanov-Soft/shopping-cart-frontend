import { Button, Checkbox, Flex } from '@mantine/core';
import { toggleAll, useSelection } from 'context/selection';
import { IoMdClose } from 'react-icons/io';
import { CartItem } from 'types/cart';

interface TopActionsProps {
  items: CartItem[];
}

export function TopActions({ items }: TopActionsProps) {
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
        onClick={() => console.log(state)}
      >
        Delete selected
      </Button>
    </Flex>
  );
}
