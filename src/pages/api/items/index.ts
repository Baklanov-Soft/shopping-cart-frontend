import type { NextApiRequest, NextApiResponse } from 'next';
import { ListItem } from 'types/catalog';
import goods from './goods';

const items = goods.map((guitar) => ({
  uuid: guitar.uuid,
  name: guitar.name,
  price: guitar.price
}));

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ListItem[]>
) {
  res.status(200).json(items);
}
