import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.query;

  if (typeof username === 'string') {
    const decoded = Buffer.from(username, 'base64url').toString();
    if (decoded === 'bob') {
      return res.status(200).end();
    }
  }

  res.status(404).end();
}

export default handler;
