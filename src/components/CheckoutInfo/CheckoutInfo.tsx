import { Box, Button, Divider, Flex, Text } from '@mantine/core';
import type { Money } from 'types/catalog';

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
          {toString(totalPrice)}
        </Text>
      </Flex>
    </div>
  );
}

function toString({ currency, value }: Money) {
  switch (currency) {
    case 'USD':
      return '$' + value.toString();

    default:
      throw new Error('Unsupported currency.');
  }
}
