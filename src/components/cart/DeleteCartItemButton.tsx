import { Button } from '@mantine/core';
import useSWRMutation from 'swr/mutation';

interface DeleteCartItemButtonProps {
  uuid: string;
}

export function DeleteCartItemButton({ uuid }: DeleteCartItemButtonProps) {
  const { trigger, isMutating } = useSWRMutation('/api/v1/cart', deleteItem);
  return (
    <Button
      color="red"
      compact
      variant="subtle"
      onClick={() => trigger(uuid)}
      loading={isMutating}
    >
      Delete
    </Button>
  );
}

async function deleteItem(url: string, { arg: uuid }: { arg: string }) {
  await fetch(url + '?' + new URLSearchParams({ itemId: uuid }), {
    method: 'DELETE'
  });
}
