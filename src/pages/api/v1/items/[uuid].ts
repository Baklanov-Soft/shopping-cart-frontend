import type { NextApiRequest, NextApiResponse } from 'next';
import { Item } from 'types/catalog';
import goods from './goods';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item | undefined>
) {
  const { uuid } = req.query;
  res.status(200).json(goods.find((i) => i.uuid === uuid));
}
