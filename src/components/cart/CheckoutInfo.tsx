import { Box, Button, Divider, Flex, Text } from '@mantine/core';
import { useUpdateCartContext } from 'context/update-cart';
import type { Money } from 'types/catalog';
import { moneyToString } from 'utils/money-to-string';

interface CheckoutInfoProps {
  totalPrice: Money;
}

export function CheckoutInfo({ totalPrice }: CheckoutInfoProps) {
  return (
    <div>
      <Box p={8}>
        <Button fullWidth type="submit">
          Checkout
        </Button>
      </Box>
      <Divider />
      <Flex justify="space-between" p={8}>
        <Text component="span" weight="bold" size="lg">
          Total price
        </Text>
        <Text component="span" weight="bold" size="lg">
          {moneyToString(totalPrice)}
        </Text>
      </Flex>
    </div>
  );
}
