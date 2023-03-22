import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { withTokenApiRoute } from 'utils/withToken';

const handler = withTokenApiRoute(function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.token) {
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
});

export default handler;
