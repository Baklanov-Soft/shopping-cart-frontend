import { GuitarItem } from '@pages/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import goods from './goods';

const items = goods.map((guitar) => ({
  uuid: guitar.uuid,
  name: guitar.name,
  price: guitar.price
}));

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<GuitarItem[]>
) {
  res.status(200).json(items);
}
