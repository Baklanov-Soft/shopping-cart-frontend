import { Button, Checkbox, Flex } from '@mantine/core';
import { toggleAll, useSelection } from 'context/selection';
import { IoMdClose } from 'react-icons/io';
import useSWRMutation from 'swr/mutation';
import { CartItem } from 'types/cart';

interface TopActionsProps {
  items: CartItem[];
}

export function TopActions({ items }: TopActionsProps) {
  const { state, dispatch } = useSelection();
  const { trigger } = useSWRMutation('/api/v1/cart', deleteItemsBulk);

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
        onClick={() => {
          const newItems = items
            .filter((item) => !state.includes(item.item.uuid))
            .reduce(
              (acc, item) => ({ ...acc, [item.item.uuid]: item.quantity }),
              {}
            );

          return trigger(newItems);
        }}
      >
        Delete selected
      </Button>
    </Flex>
  );
}

async function deleteItemsBulk(
  url: string,
  { arg: items }: { arg: Record<string, number> }
) {
  await fetch(url, { method: 'PUT', body: JSON.stringify({ items }) });
}
