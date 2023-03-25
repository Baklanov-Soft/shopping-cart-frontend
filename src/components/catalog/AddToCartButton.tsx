import { Button } from '@mantine/core';
import useSWRMutation from 'swr/mutation';

interface AddToCartButtonProps {
  uuid: string;
}

export function AddToCartButton({ uuid }: AddToCartButtonProps) {
  const { trigger, isMutating } = useSWRMutation('/api/v1/cart', addToCart);

  return (
    <Button size="xs" onClick={() => trigger(uuid)} loading={isMutating}>
      Add to cart
    </Button>
  );
}

async function addToCart(url: string, { arg: uuid }: { arg: string }) {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ items: { [uuid]: 1 } })
  });
}
