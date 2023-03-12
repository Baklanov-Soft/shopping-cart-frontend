import type { NextApiRequest, NextApiResponse } from 'next';
import { Item } from 'types/catalog';

function handler(req: NextApiRequest, res: NextApiResponse<Item | undefined>) {
  const { uuid } = req.query;
  if (req.method == 'delete') {
    res.status(204).end();
  } else {
    res.status(200).end();
  }
}
export default handler;
