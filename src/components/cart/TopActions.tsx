import { Button, Checkbox, Flex } from '@mantine/core';
import { CartItem } from 'types/cart';
import { toggleAll, useSelection } from 'context/selection';
import { IoMdClose } from 'react-icons/io';

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
      >
        Delete selected
      </Button>
    </Flex>
  );
}
