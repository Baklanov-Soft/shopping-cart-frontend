import { Guitar } from '@pages/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import goods from './goods';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Guitar | undefined>
) {
  const { uuid } = req.query;
  res.status(200).json(goods.find((i) => i.uuid === uuid));
}
