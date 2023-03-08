import { Anchor, Text } from '@mantine/core';

import Link from 'next/link';
function Logo() {
  return (
    <Anchor component={Link} href={{ pathname: '/' }}>
      <Text fz="lg" fw="bolder" tt="uppercase" component="span">
        Shopping cart
      </Text>
    </Anchor>
  );
}
export default Logo;
