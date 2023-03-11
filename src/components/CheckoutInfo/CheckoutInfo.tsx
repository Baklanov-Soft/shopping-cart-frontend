import { Box, Button, Divider, Flex, Text } from '@mantine/core';
import type { Money } from 'types/catalog';
import moneyToString from 'utils/money-to-string';

interface CheckoutInfoProps {
  quantity: number;
  totalPrice: Money;
}

export function CheckoutInfo({ quantity, totalPrice }: CheckoutInfoProps) {
  return (
    <div>
      <Box p={8}>
        <Button fullWidth>Checkout</Button>
      </Box>
      <Divider />
      <Flex justify="space-between" p={8}>
        <Text component="span" weight="bold" size="lg">
          Your cart
        </Text>
        <Text component="span" weight="bold" size="lg">
          {quantity === 1
            ? quantity.toString().concat(' item')
            : quantity.toString().concat(' items')}
        </Text>
      </Flex>
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
