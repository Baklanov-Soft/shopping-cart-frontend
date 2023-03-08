import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (username === 'bob') {
    return res.status(200).end();
  }

  res.status(404).end();
}

export default handler;
