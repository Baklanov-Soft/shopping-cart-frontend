import { NextApiRequest, NextApiResponse } from 'next';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
  }
  res.send({
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImJvYiIsImlhdCI6MTUxNjIzOTAyMn0.-c1gcZxvwvTykX1gUnuS_Y5mwzcN3bn3NlZyXTicIbI'
  });
}

export default handler;
