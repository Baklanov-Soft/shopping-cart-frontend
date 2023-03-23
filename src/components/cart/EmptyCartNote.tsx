import { Anchor, Text } from '@mantine/core';
import Link from 'next/link';

export function EmptyCartNote() {
  return (
    <Text color="dimmed" align="center" size="lg">
      There is nothing to checkout. Go to{' '}
      <Anchor component={Link} href={{ pathname: '/catalog' }}>
        catalog
      </Anchor>{' '}
      and add some goods.
    </Text>
  );
}
