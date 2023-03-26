import { Box } from '@mantine/core';
import { DeleteCartItemButton } from './DeleteCartItemButton';

interface CartItemActionsProps {
  uuid: string;
}

export function CartItemActions({ uuid }: CartItemActionsProps) {
  return (
    <Box>
      <DeleteCartItemButton uuid={uuid} />
    </Box>
  );
}
