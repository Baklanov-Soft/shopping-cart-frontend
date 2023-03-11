import { Checkbox, NumberInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { CartItem } from 'types/cart';
import moneyToString from 'utils/money-to-string';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const [quantity, setQuantity] = useDebouncedState(item.quantity, 500);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    updateQuantity(item.item.uuid, quantity);
  }, [quantity, item.item.uuid]);

  return (
    <tr>
      <td>
        <Checkbox />
      </td>
      <td>{item.item.name}</td>
      <td>{moneyToString(item.item.price)}</td>
      <td>
        <NumberInput
          min={1}
          placeholder="quantity"
          defaultValue={quantity}
          onChange={(n) => {
            if (n) {
              setQuantity(n);
              setError(undefined);
            } else {
              setError('Can not be empty or zero');
            }
          }}
          error={error}
        />
      </td>
    </tr>
  );
}

function updateQuantity(uuid: string, quantity: number) {
  return fetch('/api/v1/cart', {
    method: 'put',
    body: JSON.stringify({ uuid, quantity })
  });
}
