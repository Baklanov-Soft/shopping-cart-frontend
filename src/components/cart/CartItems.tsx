import { Box } from '@mantine/core';
import { CartItem } from 'types/cart';
import { SelectionProvider } from 'context/selection';
import { CartItemRow } from './CartItemRow';
import { TopActions } from './TopActions';

interface CartItemsProps {
  items: CartItem[];
}

export function CartItems({ items }: CartItemsProps) {
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
