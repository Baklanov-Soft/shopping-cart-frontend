import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies['ACCESS_TOKEN'];
  if (!token) {
    return res.status(400).end();
  }

  res
    .setHeader(
      'Set-Cookie',
      serialize('ACCESS_TOKEN', '', {
        path: '/',
        expires: new Date(0)
      })
    )
    .end();
}

export default handler;
