import { Anchor, Text } from '@mantine/core';
import Link from 'next/link';

export function Logo() {
  return (
    <Anchor component={Link} href={{ pathname: '/catalog' }}>
      <Text fz="lg" fw="bolder" tt="uppercase" component="span">
        Shopping cart
      </Text>
    </Anchor>
  );
}
