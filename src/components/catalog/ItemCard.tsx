import { Anchor, Box, Card, Text } from '@mantine/core';
import Link from 'next/link';
import type { ListItem } from 'types/catalog';
import { moneyToString } from 'utils/money-to-string';
import { AddToCartButton } from './AddToCartButton';

interface ItemCardProps {
  item: ListItem;
}

export function ItemCard({ item: { name, price, uuid } }: ItemCardProps) {
  return (
    <Card
      shadow="sm"
      p="md"
      radius="md"
      withBorder
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Anchor
        component={Link}
        href={{ pathname: `/catalog/${uuid}` }}
        size="md"
      >
        {name}
      </Anchor>
      <Box
        mt="md"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text weight="bold" size="xl" component="span">
          {moneyToString(price)}
        </Text>
        <AddToCartButton />
      </Box>
    </Card>
  );
}
